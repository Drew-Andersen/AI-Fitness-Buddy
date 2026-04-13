DROP DATABASE IF EXISTS ai_fitness;

CREATE DATABASE ai_fitness;

\c ai_fitness;

-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
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

CREATE TABLE workout_logs(
    id SERIAL PRIMARY KEY
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
    day TEXT,
    exercise_name TEXT,
    weight NUMERIC,
    reps_completed TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bodyweight_logs (
    id SERIAL PRIMARY KEY,
    user_id INt REFERENCES users(id) ON DELETE CASCADE,
    weight NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);