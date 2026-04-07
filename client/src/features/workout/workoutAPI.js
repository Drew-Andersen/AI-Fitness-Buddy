export async function generateWorkout(data){
    const backendURL = "http://localhost:3001/workout/generate"
    
    const res = await fetch(backendURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}