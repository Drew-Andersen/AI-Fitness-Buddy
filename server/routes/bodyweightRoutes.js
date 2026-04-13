const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const {
  createBodyweight,
  fetchBodyweight,
} = require("../controllers/bodyweightController")

router.post("/", authMiddleware, createBodyweight)
router.get("/", authMiddleware, fetchBodyweight)

module.exports = router