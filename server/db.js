const { Pool } = require("pg")

const pool = new Pool({
  user: "drewandersen",
  host: "localhost",
  database: "ai_fitness",
  password: "",
  port: 5432,
});

module.exports = pool