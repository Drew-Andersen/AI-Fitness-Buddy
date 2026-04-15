const express = require("express")
const router = express.Router()
const { createLog, getProgress, getLogs, getLastSet } = require("../controllers/workoutLogController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, createLog)
router.get("/", authMiddleware, getLogs)
router.get("/progress", authMiddleware, getProgress)
router.get("/last", authMiddleware, getLastSet)

module.exports = router