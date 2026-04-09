const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../services/auth.service");

const SECRET = "supersecret"; // Move to .env later

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ err: "User already exists" });

    const user = await createUser(email, password);

    res.status(201).json({ message: "User created successfully", userId: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Registration failed" });
  }
}

async function login(req, res) {
  try {
    console.log("RECEIVED BODY:", req.body)
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid login credentials" });

    if (!user.password) {
      return res.status(500).json({ error: "User password is missing in database" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid login credentials" });

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "7d" });

    res.json({ token, userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = { register, login };