const express = require("express")
const router = express.Router()
const { createLog, getProgress } = require("../controllers/workoutLogController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, createLog)
router.get("/progress", authMiddleware, getProgress)

module.exports = router