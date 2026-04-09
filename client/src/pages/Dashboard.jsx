import { useEffect, useState } from "react"

export default function Dashboard() {
    const [progress, setProgress] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/workout-logs/progress?userId=1&exercise=Bench Press")
            .then((res) => res.json())
            .then(setProgress)
    }, [])

    return (
        <div>
            <h2>Progresss (Bench Press)</h2>

            {progress.map((p, i) => (
                <div key={i}>
                    {p.weight} lbs x {p.reps_completed} reps
                </div>
            ))}
        </div>
    )
}