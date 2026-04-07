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
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading) return <p>Loading workouts...</p>;
  if (!workouts.length) return <p>No workouts saved yet.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {workouts.map((workout) => {
        const isExpanded = expandedIds.includes(workout.id);

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
                <p>
                  <strong>Workout ID:</strong> {workout.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(workout.created_at).toLocaleString()}
                </p>
              </div>
              <div>{isExpanded ? "▲ Collapse" : "▼ Expand"}</div>
            </div>

            {isExpanded && (
              <div style={{ marginTop: "1rem" }}>
                {workout.plan[0]?.plan?.length ? (
                  workout.plan[0].plan.map((dayPlan, index) => {
                    const exercises =
                      dayPlan.exercises && Array.isArray(dayPlan.exercises)
                        ? dayPlan.exercises
                        : [];

                    return (
                      <div
                        key={index}
                        style={{
                          borderTop: "1px solid #ddd",
                          paddingTop: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <h4>
                          {dayPlan.day}: {dayPlan.focus}
                        </h4>
                        {exercises.length ? (
                          <ul>
                            {exercises.map((ex, i) => (
                              <li key={i}>
                                {ex.name} - {ex.sets} sets x {ex.reps}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No exercises available</p>
                        )}
                      </div>
                    );
                  })
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