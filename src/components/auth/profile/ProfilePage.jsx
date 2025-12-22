import { useAuth } from "../../../context/AuthContext";
import Logout from "../logout/ButtonLogout";

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-pulse absolute -left-28 -top-28 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="glow-pulse absolute -bottom-36 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.1fr_1.4fr]">
        {/* Profile summary */}
        <div className="reveal space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-fuchsia-400/60 to-cyan-400/60" />
              <div>
                <p className="text-sm text-white/60">Welcome</p>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-white/50">{user?.email}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-white">12</p>
                <p className="mt-1">Projects</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-white">3</p>
                <p className="mt-1">Teams</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-white">98%</p>
                <p className="mt-1">Uptime</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h3 className="text-sm font-semibold text-white/80">
              Quick actions
            </h3>
            <div className="mt-4 grid gap-3 text-sm">
              <button className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10">
                Edit profile details
              </button>
              <button className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10">
                Update password
              </button>
              <button className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 transition hover:border-white/20 hover:bg-white/10">
                Manage notifications
              </button>
              <Logout/>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="relative reveal reveal-delay-1">
          <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-white/5 blur" />
          <div className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
              <p className="mt-1 text-sm text-white/60">
                Your public info and preferences.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Bio
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Product designer exploring neon interfaces and clean systems.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Workspaces
                </p>
                <div className="mt-3 grid gap-2 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span>Core UI Lab</span>
                    <span className="text-xs text-white/50">Owner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bluewave</span>
                    <span className="text-xs text-white/50">Member</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Security
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Two-factor authentication is enabled.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="cursor-pointer rounded-xl bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0">
                Save changes
              </button>
              <button className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-white/20 hover:bg-white/10">
                View activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
