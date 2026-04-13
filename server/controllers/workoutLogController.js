const { saveWorkoutLog, getExerciseProgress, getWorkoutLogs } = require("../services/workoutLog.service")

async function createLog(req, res) {
    try {
        const log = await saveWorkoutLog(req.body)
        res.json(log)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: "Failed to save log" })
    }
}

async function getProgress(req, res) {
    try {
        const { userId, exercise } = req.query

        const data = await getExerciseProgress(userId, exercise)
        res.json(data)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: "Failed to fetch progress" })
    }
}

async function getLogs(req, res) {
    try {
        const userId = req.user.userId

        const logs = await getWorkoutLogs(userId)

        res.json(logs) 
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch logs" })
    }
}

module.exports = { createLog, getProgress, getLogs }