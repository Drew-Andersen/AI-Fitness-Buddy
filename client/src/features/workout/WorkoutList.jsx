import React, { useEffect, useState } from "react";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/workout")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch workouts", err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleInputChange = (workoutId, dayIndex, exIndex, field, value) => {
    setWorkouts((prev) =>
      prev.map((workout) => {
        if (workout.id !== workoutId) return workout;

        const updatedPlan = workout.plan[0]?.plan.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;

          const updatedExercises = day.exercises.map((ex, eIdx) => {
            if (eIdx !== exIndex) return ex;

            return {
              ...ex,
              [field]: value
            }
          });

          return { ...day, exercises: updatedExercises };
        });

        return {
          ...workout,
          plan: [{ ...workout.plan[0], plan: updatedPlan }],
        };
      })
    );
  };

  const saveLog = async (log) => {
    try {
      await fetch("http://localhost:3001/workout-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(log),
      })
    } catch (err) {
      console.error("Failed to save log", err)
    }
  }

  if (loading) return <p>Loading workouts...</p>;
  if (!workouts.length) return <p>No workouts saved yet.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {workouts.map((workout) => {
        const isExpanded = expandedIds.includes(workout.id);
        const dayPlans = workout.plan[0]?.plan || [];

        return (
          <div
            key={workout.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              background: "#f9f9f9",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => toggleExpand(workout.id)}
            >
              <div>
                <p><strong>Workout ID:</strong> {workout.id}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(workout.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>{isExpanded ? "▲ Collapse" : "▼ Expand"}</div>
            </div>

            {isExpanded && (
              <div style={{ marginTop: "1rem" }}>
                {dayPlans.length ? (
                  dayPlans.map((day, dayIndex) => (
                    <div key={dayIndex} style={{ marginBottom: "1rem" }}>
                      <h3>{day.day} - {day.focus}</h3>

                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Exercise</th>
                            <th>Sets</th>
                            <th>Target</th>
                            <th>Weight</th>
                            <th>Completed</th>
                          </tr>
                        </thead>

                        <tbody>
                          {day.exercises?.map((ex, exIndex) => (
                            <tr key={exIndex}>
                              <td>{ex.name}</td>
                              <td>{ex.sets}</td>
                              <td>{ex.reps || ex.duration}</td>

                              {/* Weight Used */}
                              <td>
                                <input
                                  type="number"
                                  placeholder="lbs"
                                  value={ex.weightUsed || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      workout.id,
                                      dayIndex,
                                      exIndex,
                                      "weightUsed",
                                      e.target.value
                                    )
                                  }
                                  onBlur={(e) =>
                                    saveLog({
                                      user_id: 1,
                                      workout_id: workout.id,
                                      day: day.day,
                                      exercise_name: ex.name,
                                      weight: e.target.value,
                                      reps_completed: ex.repsCompleted || "",
                                    })
                                  }
                                />
                              </td>

                              {/* Reps completed */}
                              <td>
                                <input
                                  type="text"
                                  placeholder="reps"
                                  value={ex.repsCompleted || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      workout.id,
                                      dayIndex,
                                      exIndex,
                                      "repsCompleted",
                                      e.target.value
                                    )
                                  }
                                  onBlur={(e) =>
                                    saveLog({
                                      user_id: 1,
                                      workout_id: workout.id,
                                      day: day.day,
                                      exercise_name: ex.name,
                                      weight: ex.weightUsed || "",
                                      reps_completed: e.target.value
                                    })
                                  } 
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <p>No plan available</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}