const pool = require("../db")

const addBodyweight = async (userId, weight) => {
    const result = await pool.query(
        `INSERT INTO bodyweight_logs (user_id, weight)
        VALUES ($1, $2) RETURNING *`,
        [userId, weight]
    )
    return result.rows[0]
}

const getBodyweightLogs = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM bodyweight_logs
        WHERE user_id = $1 ORDER BY created_at ASC`,
        [userId]
    )
    return result.rows
}

module.exports = { addBodyweight, getBodyweightLogs }