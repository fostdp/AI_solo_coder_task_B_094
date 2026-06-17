CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE bianqing_stones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    target_pitch VARCHAR(10) NOT NULL,
    target_freq FLOAT NOT NULL,
    length FLOAT NOT NULL,
    width FLOAT NOT NULL,
    thickness_profile JSONB NOT NULL,
    density FLOAT NOT NULL DEFAULT 2650.0,
    material VARCHAR(100) DEFAULT '石灰岩',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sensor_readings (
    time TIMESTAMPTZ NOT NULL,
    stone_id INTEGER REFERENCES bianqing_stones(id),
    frequency FLOAT NOT NULL,
    cents_deviation FLOAT NOT NULL,
    spectrum JSONB,
    dimensions JSONB,
    density_map JSONB
);

SELECT create_hypertable('sensor_readings', 'time');

CREATE TABLE simulation_results (
    id SERIAL PRIMARY KEY,
    stone_id INTEGER REFERENCES bianqing_stones(id),
    natural_freqs JSONB NOT NULL,
    mode_shapes JSONB NOT NULL,
    mesh_info JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE optimization_records (
    id SERIAL PRIMARY KEY,
    stone_id INTEGER REFERENCES bianqing_stones(id),
    target_freq FLOAT NOT NULL,
    initial_freq FLOAT NOT NULL,
    optimized_freq FLOAT NOT NULL,
    thickness_before JSONB NOT NULL,
    thickness_after JSONB NOT NULL,
    iterations INTEGER NOT NULL,
    convergence_history JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    stone_id INTEGER REFERENCES bianqing_stones(id),
    alert_type VARCHAR(50) NOT NULL DEFAULT 'pitch_deviation',
    cents_deviation FLOAT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sensor_stone ON sensor_readings (stone_id, time DESC);
CREATE INDEX idx_simulation_stone ON simulation_results (stone_id);
CREATE INDEX idx_optimization_stone ON optimization_records (stone_id);
CREATE INDEX idx_alerts_stone ON alerts (stone_id, created_at DESC);
CREATE INDEX idx_alerts_active ON alerts (created_at DESC) WHERE alert_type = 'pitch_deviation';

CREATE MATERIALIZED VIEW sensor_5min_avg
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('5 minutes', time) AS bucket,
    stone_id,
    AVG(frequency) AS avg_freq,
    AVG(cents_deviation) AS avg_deviation,
    COUNT(*) AS reading_count
FROM sensor_readings
GROUP BY bucket, stone_id;

SELECT add_continuous_aggregate_policy('sensor_5min_avg',
    start_offset => INTERVAL '1 hour',
    end_offset => INTERVAL '5 minutes',
    schedule_interval => INTERVAL '5 minutes');

SELECT add_retention_policy('sensor_readings', INTERVAL '90 days');
