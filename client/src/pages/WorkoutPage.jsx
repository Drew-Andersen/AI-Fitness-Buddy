import { generateWorkout } from "../features/workout/workoutAPI"
import { useState } from "react"
import WorkoutForm from "../features/workout/WorkoutForm"

export default function WorkoutPage() {
    const [plan, setPlan] = useState(null)

    async function handleGenerate(data){
        const result = await generateWorkout(data)
        setPlan(result)
    }

    return (
        <div>
            <WorkoutForm onSubmit={handleGenerate} />
            {plan && (
                <pre>{JSON.stringify(plan, null, 2)}</pre>
            )}
        </div>
    )
}