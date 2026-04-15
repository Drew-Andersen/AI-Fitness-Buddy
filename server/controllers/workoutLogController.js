const { saveWorkoutLog, getExerciseProgress, getWorkoutLogs, getLastSetForExercise } = require("../services/workoutLog.service")

async function createLog(req, res) {
    try {
        const userId = req.user.userId

        const log = await saveWorkoutLog({
            ...req.body,
            user_id: userId
        })
        
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

async function getLastSet(req, res) {
    try {
        const userId = req.user.userId
        const { exercise } = req.query

        if (!exercise) {
            return res.status(400).json({ error: "Exercise is required" })
        }

        const data = await getLastSetForExercise(userId, exercise)
        res.json(data || {})
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to fetch last set" })
    }
}

module.exports = { createLog, getProgress, getLogs, getLastSet }