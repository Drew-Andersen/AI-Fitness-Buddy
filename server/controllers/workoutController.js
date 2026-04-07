const { generateWorkoutAI } = require("../integrations/aiClient")

async function generateWorkout(req, res) {
    try {
        const userData = req.body

        const aiResponse = await generateWorkoutAI(userData)

        res.json(aiResponse)
    } catch (err) {
        console.error(err)
        res.status(500).json({ err: "Failed to generate workout" })
    }
}

module.exports = { generateWorkout }