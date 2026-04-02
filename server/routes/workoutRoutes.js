const express = require("express")
const router = express.Router()
const{ generateWorkout } = require("../controllers/workoutController")

router.post("/generate", generateWorkout)

module.exports = router