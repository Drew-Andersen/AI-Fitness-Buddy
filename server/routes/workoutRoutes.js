const express = require("express")
const router = express.Router()
const{ generateWorkout } = require("../controllers/workoutController")

// For testing only
// router.get("/generate", (req, res) => {
//     res.send("Workout endpoint is working!")
// })
router.post("/generate", generateWorkout)

module.exports = router