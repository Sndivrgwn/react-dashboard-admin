import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
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
          <svg
            className="mx-auto h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            <path d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A9.75 9.75 0 0 1 12 21.75a9.75 9.75 0 0 1-7.499-2.632Z" />
          </svg>
        </button>
        <button
          type="button"
          className="relative h-10 w-10 rounded-full border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
        >
          <svg
            className="mx-auto h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.311 6.022 23.848 23.848 0 0 0 5.454 1.31m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
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
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white">
                    {`${user?.first_name?.[0] || "U"}${user?.last_name?.[0] || ""}`}
                  </div>
                )}
            <div className="hidden text-sm text-slate-300 sm:block">
              {user?.first_name || "-"}
            </div>
            <svg
              className="h-4 w-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
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
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    <path d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A9.75 9.75 0 0 1 12 21.75a9.75 9.75 0 0 1-7.499-2.632Z" />
                  </svg>
                  Account profile
                </span>
              </Link>
              <Link
                to="/profile"
                className="block rounded-xl px-3 py-2 transition hover:bg-white/10 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M4.5 6h3m3 6h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M4.5 12h3m3 6h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M4.5 18h3" />
                  </svg>
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
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />
                    <path d="M12 12h9m0 0-3-3m3 3-3 3" />
                  </svg>
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
