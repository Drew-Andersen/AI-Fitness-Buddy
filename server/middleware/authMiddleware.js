const jwt = require("jsonwebtoken")

const SECRET = "supersecret"

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ error: "No token provided" })
        }

        const token = authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({ error: "Invalid token format" })
        }

        const decoded = jwt.verify(token, SECRET)

        req.user = decoded

        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: "Unauthorized" })
    }
}

module.exports = authMiddleware