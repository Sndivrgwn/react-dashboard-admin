import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const {isAuth, loading} = useAuth()

    if (loading) return <p>Loading</p>

    return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
}