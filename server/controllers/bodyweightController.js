const { addBodyweight, getBodyweightLogs } = require("../services/bodyweight.service")

async function createBodyweight(req, res) {
    try {
        const userId = req.user.userId
        const { weight } = req.body  

        const log = await addBodyweight(userId, weight)
        res.json(log)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to save bodyweight" })
    }
}

async function fetchBodyweight(req, res) {
    try {
        const userId = req.user.userId

        const logs = await getBodyweightLogs(userId)
        res.json(logs)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: "Failed to fetch bodyweight logs" })
    }
}

module.exports = { createBodyweight, fetchBodyweight }