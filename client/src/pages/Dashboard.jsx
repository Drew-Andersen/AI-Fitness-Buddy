import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

export default function Dashboard() {
  const [logs, setLogs] = useState([])
  const [exercise, setExercise] = useState("Bench Press")
  const [bodyweightLogs, setBodyweightLogs] = useState([])
  const [newWeight, setNewWeight] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [logsRes, bodyweightRes] = await Promise.all([
          fetch("http://localhost:3001/workout-logs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/bodyweight", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const logsText = await logsRes.text()
        const bodyText = await bodyweightRes.text()

        const logsData = logsText ? JSON.parse(logsText) : []
        const bodyweightData = bodyText ? JSON.parse(bodyText) : []

        setLogs(logsData)
        setBodyweightLogs(bodyweightData)
      } catch (err) {
        console.error("Failed to load dashboard data", err)
      }
    }

    loadData()
  }, [token])

  const handleAddWeight = async () => {
    await fetch("http://localhost:3001/bodyweight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ weight: newWeight }),
    });

    setNewWeight("")

    const res = await fetch("http://localhost:3001/bodyweight", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json()
    setBodyweightLogs(data)
  };

  const filteredLogs = logs
    .filter((log) => log.exercise_name === exercise)
    .map((log) => ({
      date: new Date(log.created_at).toLocaleDateString(),
      weight: log.weight,
    }))

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Progress Dashboard</h2>

      <div>
        <label>Select Exercise: </label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option>Bench Press</option>
          <option>Squats</option>
          <option>Deadlifts</option>
          <option>Overhead Press</option>
        </select>
      </div>

      <h3>{exercise} Progress</h3>
      <LineChart width={600} height={300} data={filteredLogs}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" />
      </LineChart>

      <h3>Bodyweight Tracking</h3>

      <input
        type="number"
        placeholder="Enter weight"
        value={newWeight}
        onChange={(e) => setNewWeight(e.target.value)}
      />
      <button onClick={handleAddWeight}>Add</button>

      <LineChart width={600} height={300} data={bodyweightLogs}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="created_at"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip />
        <Line dataKey="weight" />
      </LineChart>
    </div>
  );
}
