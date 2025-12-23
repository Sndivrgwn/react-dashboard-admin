import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BackgroundAnimation from "../components/template/BackgroundAnimation";

export default function ProtectedRoute() {
  const { isAuth, loading } = useAuth();

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-4 text-sm text-white/70 shadow-xl">
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
            Loading your profile...
          </span>
        </div>
      </div>
    );

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
