import { useState  } from "react"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            console.log("REGISTER RESPONSE", data)

            if (res.ok) {
                setMessage("Registration successful! You can now log in.")
                setEmail("")
                setPassword("")
            } else {
                setMessage(data.err || "Registration failed")
            }
        } catch (err) {
            console.error(err)
            setMessage("Error connecting to server")
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
                    />
                </div>
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                    Register
                </button>
            </form>
            {message && <p style={{ margin: "1rem" }}>{message}</p>}
        </div>
    )
}