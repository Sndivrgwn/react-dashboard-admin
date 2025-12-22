import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ isSidebarOpen, onToggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3a6 6 0 0 0 0 12 6 6 0 0 0 0-12Z" />
            <path d="M19 21a8 8 0 0 0-14 0" />
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="h-8 w-8 rounded-full bg-slate-300" />
            <div className="hidden text-sm text-slate-300 sm:block">
              Musharof
            </div>
            <svg
              className="h-4 w-4 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {isMenuOpen ? (
            <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-slate-950 p-2 text-sm text-white/70 shadow-xl">
              <div className="px-3 py-2">
                <p className="text-sm font-semibold text-white">Musharof</p>
                <p className="text-xs text-white/50">musharof@email.com</p>
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 21a8 8 0 0 0-16 0" />
                    <circle cx="12" cy="7" r="4" />
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.54V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.87.34l-.06.06A2 2 0 1 1 4.2 17l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.54-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06A2 2 0 0 1 7.06 4.2l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.54V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.87-.34l.06-.06A2 2 0 1 1 19.8 7l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.54 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.54 1Z" />
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
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
