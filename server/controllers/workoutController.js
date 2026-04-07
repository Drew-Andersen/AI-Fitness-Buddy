const { generateWorkoutAI } = require("../integrations/aiClient");
const { saveWorkout, getWorkout } = require("../services/workout.service");

async function generateWorkout(req, res) {
  try {
    const { userId, weight, goal, experience } = req.body;

    const plan = await generateWorkoutAI({ weight, goal, experience });

    const savedWorkout = await saveWorkout(userId, plan);

    res.json(savedWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Failed to generate workout" });
  }
}

async function getWorkouts(req, res) {
  try {
    const workouts = await getWorkout();
    res.json(workouts);
  } catch (err) {
    console.error("Controller error fetching workouts:", err); 
    res.status(500).json({ err: "Failed to fetch workouts" });
  }
}

module.exports = { generateWorkout, getWorkouts };