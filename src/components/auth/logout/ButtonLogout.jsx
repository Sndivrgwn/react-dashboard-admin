import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="cursor-pointer rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-left text-rose-200 transition hover:border-rose-400/70 hover:bg-rose-500/20"
    >
      Log out
    </button>
  );
}
