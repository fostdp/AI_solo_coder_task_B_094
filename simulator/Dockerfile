FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY mqtt_simulator.py .
COPY stone_config.json .

CMD ["python", "mqtt_simulator.py"]
