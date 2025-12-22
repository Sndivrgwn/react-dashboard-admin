import { useAuth } from "../../../context/AuthContext";

export default function ProfileSummary() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-white/70">Loading...</div>;
  }
    return (
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-400/60 to-cyan-400/60" />
              <div>
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-white/60">
                  Team Manager &nbsp;|&nbsp; Arizona, United States
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9v-2.9h2.5V9.6c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4H15.3c-1.2 0-1.6.7-1.6 1.5v1.8h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.3 2H21l-6.3 7.2L22 22h-6.8l-4.9-7.1L3.9 22H1l7.2-8.2L2 2h6.9l4.5 6.6L18.3 2z" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.75 3.5A1.75 1.75 0 1 1 3 5.25 1.75 1.75 0 0 1 4.75 3.5zm-1.5 5h3v12h-3v-12zm6 0h2.9v1.64h.04c.4-.75 1.4-1.54 2.9-1.54 3.1 0 3.7 2.04 3.7 4.7v7.2h-3v-6.38c0-1.52-.03-3.48-2.12-3.48-2.12 0-2.44 1.66-2.44 3.37v6.5h-3v-12z" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-white/20 hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.1-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM20 6.1v11.8A2.1 2.1 0 0 1 17.9 20H6.1A2.1 2.1 0 0 1 4 17.9V6.1A2.1 2.1 0 0 1 6.1 4h11.8A2.1 2.1 0 0 1 20 6.1zm-1.8 0a.3.3 0 0 0-.3-.3H6.1a.3.3 0 0 0-.3.3v11.8c0 .2.1.3.3.3h11.8c.2 0 .3-.1.3-.3V6.1z" />
                </svg>
              </button>
              <button className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white">
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
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>
    )
}
