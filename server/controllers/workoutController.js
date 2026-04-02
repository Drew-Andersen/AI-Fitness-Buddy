async function generateWorkout(req, res) {

    console.log("HIT WORKOUT ROUTE")
    req.json({message: "Workout route working"})

    // const { userID } = req.body

    // Dummy Data to get working
    // const workoutPlan = {
    //     userID,
    //     plan: [
    //         { day: "Monday", exercise: "Push-Ups", reps: 20},
    //         { day: "Tuesday", exercise: "Squats", reps: 15}
    //     ]
    // }

    // res.json(workoutPlan)
}

module.exports = { generateWorkout }