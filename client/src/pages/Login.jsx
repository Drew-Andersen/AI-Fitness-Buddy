import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Login() {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] =useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        const res = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()
        
        if (res.ok) {
            login(data.token)
            navigate("/dashboard")
        } 

        login(data.token)
    }

    return (
        <div>
            <h2>Login</h2>
            <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}