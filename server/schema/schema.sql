DROP DATABASE IF EXISTS ai_fitness;

CREATE DATABASE ai_fitness;

\c ai_fitness;

-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    weight INT,
    goal TEXT,
    experience TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workouts Table
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    plan JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);