const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const workoutRoutes = require("./routes/workoutRoutes")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/workout", workoutRoutes)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});