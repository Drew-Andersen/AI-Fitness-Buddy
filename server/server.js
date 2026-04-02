const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/workout/generate", (req, res) => {
  console.log("HIT WORKOUT ROUTE");
  res.json({ message: "Workout route working" });
});

const PORT = 3001;

// IMPORTANT: This must be at the top level
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});