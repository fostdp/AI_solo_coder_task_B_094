-- Create 1-minute continuous aggregate
CREATE MATERIALIZED VIEW sensor_1min_avg
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 minute', time) AS bucket,
    stone_id,
    AVG(frequency) AS avg_frequency,
    MIN(frequency) AS min_frequency,
    MAX(frequency) AS max_frequency,
    AVG(cents_deviation) AS avg_cents_deviation
FROM sensor_readings
GROUP BY bucket, stone_id;

-- Add continuous aggregate policy for 1min view
SELECT add_continuous_aggregate_policy('sensor_1min_avg',
    start_offset => INTERVAL '30 minutes',
    end_offset => INTERVAL '1 minute',
    schedule_interval => INTERVAL '10 minutes');

-- Create 1-hour continuous aggregate
CREATE MATERIALIZED VIEW sensor_1hour_avg
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 hour', time) AS bucket,
    stone_id,
    AVG(frequency) AS avg_frequency,
    MIN(frequency) AS min_frequency,
    MAX(frequency) AS max_frequency,
    AVG(cents_deviation) AS avg_cents_deviation
FROM sensor_readings
GROUP BY bucket, stone_id;

-- Add continuous aggregate policy for 1hour view
SELECT add_continuous_aggregate_policy('sensor_1hour_avg',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');

-- Enable compression on sensor_readings hypertable
ALTER TABLE sensor_readings SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'stone_id',
    timescaledb.compress_orderby = 'time DESC'
);

-- Add compression policy: compress chunks after 7 days
SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');

-- Add retention policy for raw data: drop chunks after 90 days
-- Note: retention policy for raw data already exists in 001_init.sql
-- Uncomment below if you want to update the existing policy
-- SELECT remove_retention_policy('sensor_readings');
-- SELECT add_retention_policy('sensor_readings', INTERVAL '90 days');

-- Add retention policy for 1min aggregate: drop chunks after 1 year
SELECT add_retention_policy('sensor_1min_avg', INTERVAL '1 year');

-- Add retention policy for 1hour aggregate: drop chunks after 5 years
SELECT add_retention_policy('sensor_1hour_avg', INTERVAL '5 years');
