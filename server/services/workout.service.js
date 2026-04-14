const pool = require("../db");

const saveWorkout = async (userId, plan) => {
  try {
    const query = `
      INSERT INTO workouts (user_id, plan)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [userId, JSON.stringify(plan)];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error saving workout:", err);
    throw err;
  }
};

const getWorkout = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    return result.rows.map((row) => ({
      ...row,
      plan: typeof row.plan === "string" ? JSON.parse(row.plan) : row.plan, 
    }));
  } catch (err) {
    console.error("Error fetching workouts:", err);
    throw err;
  }
};

module.exports = { saveWorkout, getWorkout };