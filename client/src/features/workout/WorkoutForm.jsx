import { useState } from "react"

export default function WorkoutForm({ onSubmit }){
    const [form, setForm] = useState({
        weight: "",
        goal: "cut",
        experience: "intermediate",
    })

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="workoutForm"
                name="weight"
                placeholder="Weight"
                onChange={handleChange}
            />

            <select className="workoutForm" name="goal" onChange={handleChange}>
                <option value="cut">Cut</option>
                <option value="maintain">Maintain</option>
                <option value="bulk">Bulk</option>
            </select>

            <select className="workoutForm" name="experience" onChange={handleChange}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>

            <button className="workoutForm button" type="submit">Generate Workout</button>
        </form>
    )
}