export async function generateWorkout(data){
    const token = localStorage.getItem("token")

    const backendURL = "http://localhost:3001/workout/generate"
    
    const res = await fetch(backendURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!token) {
        throw new Error("Failed to generate workout")
    }

    return await res.json()
}