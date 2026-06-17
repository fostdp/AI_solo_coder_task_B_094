#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import json
import logging
import os
import signal
import sys
import time
from datetime import datetime

import numpy as np
import paho.mqtt.client as mqtt


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)


class StoneSimulator:
    def __init__(self, stone_config):
        self.id = stone_config['id']
        self.name = stone_config['name']
        self.target_freq = stone_config['target_freq']
        self.length_mm = stone_config['length_mm']
        self.width_mm = stone_config['width_mm']
        self.thickness_mm = stone_config['thickness_mm']
        self.density = stone_config['density']

    def _gaussian_peak(self, x, center, amplitude, sigma):
        return amplitude * np.exp(-((x - center) ** 2) / (2 * sigma ** 2))

    def generate_fft_spectrum(self, base_freq, num_points=64, num_harmonics=8):
        freqs = np.linspace(0, base_freq * (num_harmonics + 1), num_points)
        spectrum = np.zeros(num_points)

        for h in range(1, num_harmonics + 1):
            harmonic_freq = base_freq * h
            amplitude = 1.0 / h
            sigma = base_freq * 0.02
            spectrum += self._gaussian_peak(freqs, harmonic_freq, amplitude, sigma)

        noise = np.random.normal(0, 0.02, num_points)
        spectrum += noise
        spectrum = np.maximum(spectrum, 0)

        return {
            'frequencies': freqs.tolist(),
            'amplitudes': spectrum.tolist()
        }

    def generate_density_map(self, num_points=20, deviation=0.04):
        base_density = self.density
        density_map = base_density * (1 + np.random.uniform(-deviation, deviation, num_points))
        return density_map.tolist()

    def generate_dimensions(self, deviation=0.02):
        return {
            'length_mm': self.length_mm * (1 + np.random.uniform(-deviation, deviation)),
            'width_mm': self.width_mm * (1 + np.random.uniform(-deviation, deviation)),
            'thickness_mm': self.thickness_mm * (1 + np.random.uniform(-deviation, deviation))
        }

    def generate_reading(self):
        freq_deviation = np.random.uniform(-0.05, 0.05)
        current_freq = self.target_freq * (1 + freq_deviation)

        cents_deviation = 1200 * np.log2(current_freq / self.target_freq)

        fft_spectrum = self.generate_fft_spectrum(current_freq)
        density_map = self.generate_density_map()
        dimensions = self.generate_dimensions()

        return {
            'stone_id': self.id,
            'stone_name': self.name,
            'timestamp': datetime.now().isoformat(),
            'target_freq_hz': self.target_freq,
            'current_freq_hz': current_freq,
            'freq_deviation_pct': freq_deviation * 100,
            'cents_deviation': cents_deviation,
            'dimensions': dimensions,
            'density_map': density_map,
            'fft_spectrum': fft_spectrum
        }


class MqttSimulator:
    def __init__(self, stones, mqtt_host, mqtt_port, topic_prefix, client_id, interval):
        self.stones = [StoneSimulator(s) for s in stones]
        self.mqtt_host = mqtt_host
        self.mqtt_port = mqtt_port
        self.topic_prefix = topic_prefix
        self.client_id = client_id
        self.interval = interval
        self.running = False

        self.client = mqtt.Client(
            callback_api_version=mqtt.CallbackAPIVersion.VERSION2,
            client_id=client_id,
            clean_session=False
        )
        self.client.on_connect = self._on_connect
        self.client.on_disconnect = self._on_disconnect
        self.client.on_publish = self._on_publish

        will_topic = f"{topic_prefix}/status/{client_id}"
        will_payload = json.dumps({
            'status': 'offline',
            'client_id': client_id,
            'timestamp': datetime.now().isoformat()
        })
        self.client.will_set(will_topic, will_payload, qos=1, retain=True)

        signal.signal(signal.SIGINT, self._signal_handler)
        signal.signal(signal.SIGTERM, self._signal_handler)

    def _on_connect(self, client, userdata, flags, reason_code, properties):
        if reason_code == 0:
            logger.info(f"已连接到 MQTT 代理 {self.mqtt_host}:{self.mqtt_port}")
            status_topic = f"{self.topic_prefix}/status/{self.client_id}"
            status_payload = json.dumps({
                'status': 'online',
                'client_id': self.client_id,
                'stone_count': len(self.stones),
                'timestamp': datetime.now().isoformat()
            })
            client.publish(status_topic, status_payload, qos=1, retain=True)
        else:
            logger.error(f"MQTT 连接失败，原因码: {reason_code}")

    def _on_disconnect(self, client, userdata, disconnect_flags, reason_code, properties):
        logger.warning(f"MQTT 连接断开，原因码: {reason_code}")
        if self.running:
            logger.info("尝试重新连接...")

    def _on_publish(self, client, userdata, mid, reason_code, properties):
        logger.debug(f"消息已发布，mid: {mid}")

    def _signal_handler(self, signum, frame):
        logger.info(f"收到信号 {signum}，正在关闭...")
        self.running = False

    def publish_stone_data(self, stone):
        reading = stone.generate_reading()
        topic = f"{self.topic_prefix}/sensor/{stone.id}"
        payload = json.dumps(reading, ensure_ascii=False)

        result = self.client.publish(topic, payload, qos=1)
        if result.rc == mqtt.MQTT_ERR_SUCCESS:
            logger.info(f"已发布 {stone.name} (ID: {stone.id}) 数据: "
                        f"{reading['current_freq_hz']:.2f} Hz, "
                        f"{reading['cents_deviation']:+.1f} 音分")
        else:
            logger.error(f"发布 {stone.name} 数据失败: {result.rc}")

    def connect(self):
        try:
            self.client.connect(self.mqtt_host, self.mqtt_port, keepalive=60)
            self.client.loop_start()
            return True
        except Exception as e:
            logger.error(f"连接 MQTT 代理失败: {e}")
            return False

    def disconnect(self):
        status_topic = f"{self.topic_prefix}/status/{self.client_id}"
        status_payload = json.dumps({
            'status': 'offline',
            'client_id': self.client_id,
            'timestamp': datetime.now().isoformat()
        })
        self.client.publish(status_topic, status_payload, qos=1, retain=True)
        self.client.loop_stop()
        self.client.disconnect()
        logger.info("已断开 MQTT 连接")

    def run(self):
        self.running = True
        logger.info(f"启动编磬模拟器，共 {len(self.stones)} 块磬石，发布间隔 {self.interval} 秒")

        if not self.connect():
            logger.error("无法连接到 MQTT 代理，退出")
            return

        try:
            while self.running:
                for stone in self.stones:
                    if not self.running:
                        break
                    if self.client.is_connected():
                        self.publish_stone_data(stone)
                    else:
                        logger.warning("MQTT 未连接，跳过本次发布")
                    time.sleep(0.1)

                for _ in range(int(self.interval * 10)):
                    if not self.running:
                        break
                    time.sleep(0.1)

        except Exception as e:
            logger.error(f"模拟器运行出错: {e}")
        finally:
            self.disconnect()
            logger.info("模拟器已停止")


def load_stone_config(config_path):
    if not os.path.exists(config_path):
        logger.error(f"配置文件不存在: {config_path}")
        sys.exit(1)

    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def parse_args():
    parser = argparse.ArgumentParser(description='编磬 MQTT 声学模拟器')
    parser.add_argument('--config', type=str, default=None,
                        help='石头配置文件路径')
    parser.add_argument('--mqtt-host', type=str, default=None,
                        help='MQTT 代理主机地址')
    parser.add_argument('--mqtt-port', type=int, default=None,
                        help='MQTT 代理端口')
    parser.add_argument('--topic-prefix', type=str, default=None,
                        help='MQTT 主题前缀')
    parser.add_argument('--client-id', type=str, default=None,
                        help='MQTT 客户端 ID')
    parser.add_argument('--interval', type=int, default=None,
                        help='发布间隔（秒）')
    return parser.parse_args()


def main():
    args = parse_args()

    mqtt_host = args.mqtt_host or os.environ.get('MQTT_HOST', 'localhost')
    mqtt_port = args.mqtt_port or int(os.environ.get('MQTT_PORT', '1883'))
    topic_prefix = args.topic_prefix or os.environ.get('MQTT_TOPIC_PREFIX', 'bianqing')
    client_id = args.client_id or os.environ.get('MQTT_CLIENT_ID', 'bianqing-simulator')
    interval = args.interval or int(os.environ.get('SIMULATOR_INTERVAL', '60'))
    config_path = args.config or os.environ.get('STONE_CONFIG', '/app/stone_config.json')

    stones_config = os.environ.get('STONES_JSON')
    if stones_config:
        try:
            stones = json.loads(stones_config)
            logger.info("从环境变量 STONES_JSON 加载石头配置")
        except json.JSONDecodeError as e:
            logger.error(f"解析 STONES_JSON 环境变量失败: {e}")
            sys.exit(1)
    else:
        stones = load_stone_config(config_path)
        logger.info(f"从配置文件加载石头配置: {config_path}")

    logger.info(f"配置信息: MQTT={mqtt_host}:{mqtt_port}, "
                f"主题前缀={topic_prefix}, 客户端ID={client_id}, "
                f"间隔={interval}s, 石头数量={len(stones)}")

    simulator = MqttSimulator(
        stones=stones,
        mqtt_host=mqtt_host,
        mqtt_port=mqtt_port,
        topic_prefix=topic_prefix,
        client_id=client_id,
        interval=interval
    )

    simulator.run()


if __name__ == '__main__':
    main()
