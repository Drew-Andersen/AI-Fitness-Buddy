const AI_URL = "http://localhost:8000" // AI URL

async function generateWorkoutAI(userData) {
    const response = await fetch (`${AI_URL}/workout/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    })

    if (!response.ok) {
        throw new Error("AI service failed")
    }

    return await response.json()
}

module.exports = { generateWorkoutAI }