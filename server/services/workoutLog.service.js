const pool = require("../db")

const saveWorkoutLog = async ({user_id, workout_id, day, exercise_name, weight, reps_completed}) => {
    const query = `
        INSERT INTO workout_logs
        (user_id, workout_id, day, exercise_name, weight, reps_completed)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    const values = [
        user_id,
        workout_id,
        day, 
        exercise_name,
        weight,
        reps_completed
    ]

    const result = await pool.query(query, values)
    return result.rows[0]
}

const getExerciseProgress = async (user_id, exercise_name) => {
    const query = `
        SELECT weight, reps_completed, created_at FROM workout_logs
        WHERE user_id = $1 AND exercise_name = $2
        ORDER BY created_at ASC
    `;

    const result = await pool.query(query, [user_id, exercise_name])
    return result.rows
}

module.exports = { saveWorkoutLog, getExerciseProgress }