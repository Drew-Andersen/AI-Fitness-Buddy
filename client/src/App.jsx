import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"

import { AuthContext } from "./context/AuthContext"
import "./app.css"

import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import WorkoutPage from "./pages/WorkoutPage"
import Dashboard from "./pages/Dashboard"

// Route Wrapper
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext)

  return token ? children : <Navigate to="/login" />
}

export default function App() {
  const { token } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Default */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        {/* Public */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" replace />} />

        {/* Protected */}
        <Route 
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route 
          path="/workouts"
          element={
            <PrivateRoute>
              <WorkoutPage />
            </PrivateRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  )
}