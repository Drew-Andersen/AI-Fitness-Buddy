import { useEffect, useState } from "react"
import "./styles.css"

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedIds, setExpandedIds] = useState([])

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) return

    fetch("http://localhost:3001/workout/active", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const text = await res.text()
        if (!res.ok) throw new Error(text)
        return text ? JSON.parse(text) : []
      })
      .then((data) => {
        setWorkouts(data ? [data] : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false);
      })
  }, [token]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const fetchLastSet = async (exerciseName, workoutId, dayIndex, exIndex) => {
    try {
      const res = await fetch(`http://localhost:3001/workout-logs/last?exercise=${encodeURIComponent(
        exerciseName
      )}`,
    {headers: {Authorization: `Bearer ${token}`,}})

    const data = await res.json()

    setWorkouts((prev) => 
      prev.map((w) => {
        if (w.id !== workoutId) return w

        const updatedPlan = w.plan[0].plan.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day

          const updatedExercises = day.exercises.map((ex, eIdx) => {
            if (eIdx !== exIndex) return ex

            if (ex.loggedSets) return ex

            const sets = Array.from({ length: ex.sets }, (_, i) => {
              if (i === 0) {
                return {
                  reps: data?.reps_completed || "",
                  weight: data?.weight || "",
                }
              }
              return { reps: "", weight: "" }
            })
            return { ...ex, loggedSets: sets }
          })
          return {...day, exercises: updatedExercises }
        })
        return {...w, plan: [{ ...w.plan[0], plan: updatedPlan }]}
      })
    )
    } catch (err) {
      console.error("Failed to fetch last set", err)
    }
  }

  const handleSetChange = (workoutId, dayIndex, exIndex, setIndex, field, value) => {
    setWorkouts((prev) =>
      prev.map((w) => {
        if (w.id !== workoutId) return w

        const updatedPlan = w.plan[0].plan.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day

          const updatedExercises = day.exercises.map((ex, eIdx) => {
            if (eIdx !== exIndex) return ex

            const sets = [...(ex.loggedSets || [])]

            sets[setIndex] = {
              ...sets[setIndex],
              [field]: value
            }

            const currentSet = sets[setIndex]
            const nextSet = sets[setIndex + 1]

            if (
              currentSet?.reps && currentSet?.weight && nextSet &&
              !nextSet.reps && !nextSet.weight
            ) {
              sets[setIndex +1] = {
                reps: currentSet.reps,
                weight: currentSet.weight,
              }
            }

            return { ...ex, loggedSets: sets }
          });

          return { ...day, exercises: updatedExercises }
        });

        return { ...w, plan: [{ ...w.plan[0], plan: updatedPlan }] }
      })
    );
  };

  const saveSet = async (log) => {
    try {
      await fetch("http://localhost:3001/workout-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(log),
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading workouts...</p>
  if (!workouts.length) return <p>No workouts yet.</p>

  return (
    <div className="container">
      {workouts.map((workout, wIndex) => {
        const isExpanded = expandedIds.includes(workout.id)
        const days = workout.plan_json?.plan || []

        return (
          <div key={workout.id} id="workout-card" className="card">
            <div
              style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              onClick={() => toggleExpand(workout.id)}
            >
              <h2>Week {wIndex + 1}</h2>
              <span>{isExpanded ? "▲" : "▼"}</span>
            </div>

            {isExpanded &&
              days.map((day, dayIndex) => (
                <div key={dayIndex} style={{ marginTop: "1rem" }}>
                  <h3>
                    Day {dayIndex + 1} — {day.focus}
                  </h3>

                  {day.exercises?.map((ex, exIndex) => {
                    if (!ex.loggedSets) {
                      fetchLastSet(ex.name, workout.id, dayIndex, exIndex)
                    }
                  
                  return  (
                    <div key={exIndex} className="card" style={{ marginTop: "1rem" }}>
                      <h4>{ex.name}</h4>

                      {(ex.loggedSets || Array.from({ length: ex.sets }, () => ({
                        reps: "",
                        weight: ""
                      }))).map(
                        (set, setIndex) => (
                          <div
                            key={setIndex}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              marginBottom: "8px",
                            }}
                          >
                            <span>Set {setIndex + 1}</span>

                            <input
                              className="input"
                              value={set?.reps || ""}
                              placeholder={ex.reps || ex.duration || "-"}
                              onChange={(e) =>
                                handleSetChange(
                                  workout.id,
                                  dayIndex,
                                  exIndex,
                                  setIndex,
                                  "reps",
                                  e.target.value
                                )
                              }
                            />

                            <input
                              className="input"
                              value={set?.weight || ""}
                              placeholder="lbs"
                              onChange={(e) =>
                                handleSetChange(
                                  workout.id,
                                  dayIndex,
                                  exIndex,
                                  setIndex,
                                  "weight",
                                  e.target.value
                                )
                              }
                            />

                            <button
                              className="button-primary"
                              onClick={() =>
                                saveSet({
                                  workout_id: workout.id,
                                  day: day.day,
                                  exercise_name: ex.name,
                                  set_number: setIndex + 1,
                                  weight: set?.weight,
                                  reps_completed: set?.reps,
                                })
                              }
                            >
                              Log Set
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}