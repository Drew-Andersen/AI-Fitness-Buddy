const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const workoutRoutes = require("./routes/workoutRoutes")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("./workout", workoutRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))