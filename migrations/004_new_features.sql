-- 004_new_features.sql
-- 添加新功能所需的数据库表

-- 材料属性扩展表
CREATE TABLE IF NOT EXISTS material_timbre (
    id SERIAL PRIMARY KEY,
    material_key VARCHAR(50) NOT NULL UNIQUE,
    material_name VARCHAR(100) NOT NULL,
    elastic_mod NUMERIC NOT NULL,
    poisson_ratio NUMERIC NOT NULL,
    density NUMERIC NOT NULL,
    brightness NUMERIC,
    warmth NUMERIC,
    decay_time NUMERIC,
    harmonic_richness NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入材料音色数据
INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('limestone', '石灰岩', 5.0e10, 0.25, 2650.0, 0.55, 0.45, 2.2, 0.72)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('marble', '大理岩', 6.0e10, 0.27, 2710.0, 0.62, 0.38, 2.4, 0.68)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('granite', '花岗岩', 5.5e10, 0.23, 2650.0, 0.58, 0.42, 2.3, 0.70)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('sandstone', '砂岩', 1.5e10, 0.20, 2300.0, 0.35, 0.65, 1.8, 0.55)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('bluestone', '青石', 7.0e10, 0.25, 2750.0, 0.68, 0.32, 2.6, 0.75)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('steel', '钢材', 2.0e11, 0.30, 7850.0, 0.85, 0.15, 3.5, 0.92)
ON CONFLICT (material_key) DO NOTHING;

INSERT INTO material_timbre (material_key, material_name, elastic_mod, poisson_ratio, density, brightness, warmth, decay_time, harmonic_richness) VALUES
    ('bronze', '青铜', 1.1e11, 0.34, 8700.0, 0.72, 0.28, 4.0, 0.85)
ON CONFLICT (material_key) DO NOTHING;

-- 现代乐器配置表
CREATE TABLE IF NOT EXISTS modern_instruments (
    id SERIAL PRIMARY KEY,
    instrument_type VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    era VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    elastic_mod NUMERIC NOT NULL,
    poisson_ratio NUMERIC NOT NULL,
    density NUMERIC NOT NULL,
    thickness NUMERIC NOT NULL,
    width NUMERIC NOT NULL,
    length_ratio NUMERIC NOT NULL DEFAULT 0.8,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO modern_instruments (instrument_type, name, era, material, elastic_mod, poisson_ratio, density, thickness, width, length_ratio) VALUES
    ('glockenspiel', '钢片琴', '现代', 'steel', 2.0e11, 0.30, 7850.0, 0.008, 0.04, 0.8)
ON CONFLICT (instrument_type) DO NOTHING;

INSERT INTO modern_instruments (instrument_type, name, era, material, elastic_mod, poisson_ratio, density, thickness, width, length_ratio) VALUES
    ('xylophone', '木琴', '现代', 'rosewood', 1.0e10, 0.35, 800.0, 0.025, 0.05, 0.9)
ON CONFLICT (instrument_type) DO NOTHING;

INSERT INTO modern_instruments (instrument_type, name, era, material, elastic_mod, poisson_ratio, density, thickness, width, length_ratio) VALUES
    ('bronze_bell', '铜铃', '当代仿制', 'bronze', 1.1e11, 0.34, 8700.0, 0.003, 0.08, 0.7)
ON CONFLICT (instrument_type) DO NOTHING;

-- 合奏声场模拟记录表
CREATE TABLE IF NOT EXISTS ensemble_simulations (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100),
    stone_ids INTEGER[] NOT NULL,
    frequencies NUMERIC[] NOT NULL,
    positions JSONB NOT NULL,
    grid_size INTEGER NOT NULL DEFAULT 64,
    field_width NUMERIC NOT NULL DEFAULT 4.0,
    field_height NUMERIC NOT NULL DEFAULT 3.0,
    pressure_field JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ensemble_simulations_created_at ON ensemble_simulations (created_at DESC);

-- 古代乐谱表
CREATE TABLE IF NOT EXISTS ancient_scores (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    era VARCHAR(100),
    tempo INTEGER NOT NULL DEFAULT 72,
    time_signature VARCHAR(20) DEFAULT '4/4',
    notes JSONB NOT NULL,
    description TEXT,
    difficulty VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用户演奏记录表
CREATE TABLE IF NOT EXISTS user_performances (
    id SERIAL PRIMARY KEY,
    user_session VARCHAR(100),
    score_id VARCHAR(100) REFERENCES ancient_scores(id),
    score_name VARCHAR(200),
    stone_hits JSONB NOT NULL,
    accuracy NUMERIC,
    duration NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_performances_created_at ON user_performances (created_at DESC);
