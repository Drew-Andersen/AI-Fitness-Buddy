import { generateWorkout } from "../features/workout/workoutAPI"
import { useState } from "react"
import WorkoutForm from "../features/workout/WorkoutForm"
import WorkoutList from "../features/workout/WorkoutList"

export default function WorkoutPage() {
    const [refresh, setRefresh] = useState(false)

    async function handleGenerate(data){
        await generateWorkout(data)
        setRefresh((prev) => !prev)
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Generate New Workout</h2>
            <WorkoutForm onSubmit={handleGenerate} />
            <hr style={{ margin: "2rem 0" }} />
            <h2>Saved Workouts</h2>
            <WorkoutList key={refresh} />
        </div>
    )
}