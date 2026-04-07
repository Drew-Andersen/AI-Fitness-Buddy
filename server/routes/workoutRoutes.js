const express = require("express")
const router = express.Router()
const { generateWorkout } = require("../controllers/workoutController")
const { getWorkouts } = require("../controllers/workoutController")

// For testing only
// router.get("/generate", (req, res) => {
//     res.send("Workout endpoint is working!")
// })
router.post("/generate", generateWorkout)
router.get("/", getWorkouts)

module.exports = router