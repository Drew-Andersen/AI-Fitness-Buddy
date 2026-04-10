const express = require("express")
const router = express.Router()
const { generateWorkout, getWorkouts } = require("../controllers/workoutController")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, getWorkouts)
router.post("/generate", authMiddleware, generateWorkout)

module.exports = router