const express = require("express")
const router = express.Router()
const { generateWorkout, getActive, finishWorkout } = require("../controllers/workoutController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/generate", authMiddleware, generateWorkout)
router.get("/active", authMiddleware, getActive)
router.post("/finish", authMiddleware, finishWorkout)

module.exports = router