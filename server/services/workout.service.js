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

export const getWorkout = async () => {
  try {
    const result = await pool.query(
      "SELECT * FROM workouts ORDER BY created_at DESC"
    );

    return result.rows.map((row) => ({
      ...row,
      plan: Array.isArray(row.plan)
        ? row.plan
        : typeof row.plan === "string"
        ? JSON.parse(row.plan)
        : [], 
    }));
  } catch (err) {
    console.error("Error fetching workouts:", err);
    throw err;
  }
};

module.exports = { saveWorkout, getWorkout };