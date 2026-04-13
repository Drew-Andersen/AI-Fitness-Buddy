const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const workoutRoutes = require("./routes/workoutRoutes")
const workoutLogRoutes = require("./routes/workoutLogRoutes")
const authRoutes = require("./routes/authRoutes")
const bodyweightRoutes = require("./routes/bodyweightRoutes")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/workout", workoutRoutes)
app.use("/workout-logs", workoutLogRoutes)
app.use("/auth", authRoutes)
app.use("/bodyweight", bodyweightRoutes)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});