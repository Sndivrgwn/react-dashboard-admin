import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);
    try {
      await logout();
      navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="cursor-pointer rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-left text-rose-200 transition hover:border-rose-400/70 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="inline-flex items-center gap-2">
        {isSubmitting ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-rose-200/80 border-t-transparent" />
            Logging out...
          </>
        ) : (
          "Log out"
        )}
      </span>
    </button>
  );
}
