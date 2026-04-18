const pool = require("../db");

const saveWorkout = async (userId, plan) => {
  try {
    const result = await pool.query(
      `INSERT INTO workouts (user_id, plan)
      VALUES ($1, $2)
      RETURNING *`,
      [userId, JSON.stringify(plan)]
    )

    return result.rows[0]
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
    )

    return result.rows.map((row) => ({
      ...row,
      plan: typeof row.plan === "string" ? JSON.parse(row.plan) : row.plan, 
    }))
  } catch (err) {
    console.error("Error fetching workouts:", err);
    throw err;
  }
};

const saveActiveWorkout = async (userId, plan) => {
  const result = await pool.query(
    `INSERT INTO active_workouts (user_id, plan_json, status)
    VALUES ($1, $2, 'active') RETURNING *`,
    [userId, JSON.stringify(plan)]
  )

  return result.rows[0]
}

const getActiveWorkout = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM active_workouts WHERE user_id = $1 AND status = 'active'
    ORDER BY created_at DESC LIMIT 1`,
    [userId]
  )

  if (!result.rows.length) return null

  return {
    ...result.rows[0],
    plan_json:
      typeof result.rows[0].plan_json === "string" ? JSON.parse(result.rows[0].plan_json) 
        : result.rows[0].plan_json,
  }
}

const finishWorkoutService = async (userId) => {
  const active = await getActiveWorkout(userId)

  if (!active) throw new Error("No active workout")

    await pool.query(
      `INSERT INTO completed_workouts (user_id, plan_json, completed_at)
      VALUES ($1, $2, NOW())`,
      [userId, JSON.stringify(active.plan_json)]
    )

    await pool.query(
      `DELETE FROM active_workouts WHERE id = $1`,
      [active.id]
    )

    return {success: true}
}

module.exports = { saveWorkout, getWorkout, saveActiveWorkout, getActiveWorkout, finishWorkoutService };