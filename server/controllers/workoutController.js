const { generateWorkoutAI } = require("../integrations/aiClient");
const { saveActiveWorkout, finishWorkoutService, getActiveWorkout } = require("../services/workout.service");

async function generateWorkout(req, res) {
  try {
    const { weight, goal, experience } = req.body
    const userId = req.user.userId

    console.log("BODY:", req.body)
    console.log("USER:", req.user)

    const plan = await generateWorkoutAI({ weight, goal, experience })
    const saved = await saveActiveWorkout(userId, plan)

    console.log("PLAN:", plan)

    res.json(saved)
  } catch(err) {
    console.error(err)
    res.status(500).json({ err: "Failed to generate workout" })
  }
}

async function getActive(req,res) {
  try {
    const userId = req.user.userId

    const workout = await getActiveWorkout(userId)

    res.json(workout || null)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "Failed to fetch active workout" })
  }
}

async function finishWorkout(req, res) {
  try {
    const userId = req.user.userId

    const result = await finishWorkoutService(userId)

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: "Failed to finish workout" })
  }
}

module.exports = { generateWorkout, getActive, finishWorkout };