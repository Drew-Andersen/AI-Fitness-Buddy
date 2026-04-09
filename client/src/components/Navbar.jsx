import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Navbar() {
    const { token, logout } = useContext(AuthContext)

    return (
        <nav style={{ padding: "1rem", background: "#222", color: "white" }}>
            <span>AI Fitness Coach</span>

            <div style={{ float: "right" }}>
                {token ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
            </div>
        </nav>
    )
}