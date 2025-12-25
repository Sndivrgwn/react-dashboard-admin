import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../template/Icon";

export default function Navbar({ isSidebarOpen, onToggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const avatarSrc = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://127.0.0.1:8000/${
          user.avatar.startsWith("storage/") ? "" : "storage/"
        }${user.avatar}`
    : "";

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  async function handleSignOut() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-pressed={!isSidebarOpen}
          aria-label="Toggle sidebar"
          className="rounded-xl cursor-pointer border border-white/10 px-3 py-2 text-white/60 transition hover:border-white/20 hover:text-white"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50 sm:flex">
          <span>Search or type command...</span>
          <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
            Ctrl K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
        >
          <Icon name="user" className="mx-auto h-5 w-5" />
        </button>
        <button
          type="button"
          className="relative h-10 w-10 rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
        >
          <Icon name="bell" className="mx-auto h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-white/20 hover:bg-white/10"
          >
            {user?.avatar ? (
                  <img
                    src={avatarSrc}
                    alt={`${user?.first_name || "User"} avatar`}
                    className="h-8 w-8  rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {`${user?.first_name?.[0] || "U"}${user?.last_name?.[0] || ""}`}
                  </div>
                )}
            <div className="hidden text-sm text-slate-300 sm:block">
              {user?.first_name || "-"}
            </div>
            <Icon name="chevron-down" className="h-4 w-4 text-slate-500" />
          </button>
          {isMenuOpen ? (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-slate-950 p-2 text-sm text-white/70 shadow-xl">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-white">{user?.first_name || "-"}</p>
                <p className="text-xs text-white/50">{user?.email || "-"}</p>
              </div>
              <div className="my-2 h-px bg-white/10" />
              <Link
                to="/profile"
                className="block rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="profile" className="h-4 w-4" />
                  Account profile
                </span>
              </Link>
              <Link
                to="/profile"
                className="block rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="settings" className="h-4 w-4" />
                  Account setting
                </span>
              </Link>
              {/* <hr className="w-50 opacity-20" /> */}
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-xl px-3 py-2 text-left text-rose-200 transition hover:bg-rose-500/10"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="logout" className="h-4 w-4" />
                  Sign out
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
