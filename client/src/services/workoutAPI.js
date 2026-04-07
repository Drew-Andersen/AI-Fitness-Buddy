const API_URL = "http://localhost:3001" // Input the server URL

export async function generateWorkout(userID) {
    try {
        const response = await fetch(`${API_URL}/workout/generate`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userID })
        })

        if (!response.ok) throw new Error("Failed to generate workout")

        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
        return null
    }
}