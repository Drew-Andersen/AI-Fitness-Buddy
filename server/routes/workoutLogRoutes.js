const express = require("express")
const router = express.Router()

const { createLog, getProgress } = require("../controllers/workoutLogController")

router.post("/", createLog)
router.get("/progress", getProgress)

module.exports = router