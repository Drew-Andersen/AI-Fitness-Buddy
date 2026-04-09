import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "bold" }}>AI Fitness Coach</span>

      <div style={{ display: "flex", gap: "1rem" }}>
        {token ? (
          <>
            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <Link
              to="/workouts"
              style={{ color: "white", textDecoration: "none" }}
            >
              Workouts
            </Link>
            <Link
              to="/login"
              onClick={logout} 
              style={{
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
