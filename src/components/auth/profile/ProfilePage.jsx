import Profiledetails from "./ProfileDetails";
import ProfileSummary from "./ProfileSummary";

export default function Profile() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">Home</p>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
        <p className="text-sm text-white/50">Home / Profile</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Projects
          </p>
          <p className="mt-2 text-2xl font-semibold">12</p>
          <p className="mt-1 text-xs text-white/50">+2 this month</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">Teams</p>
          <p className="mt-2 text-2xl font-semibold">3</p>
          <p className="mt-1 text-xs text-white/50">Active squads</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">Tasks</p>
          <p className="mt-2 text-2xl font-semibold">48</p>
          <p className="mt-1 text-xs text-white/50">7 due this week</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Uptime
          </p>
          <p className="mt-2 text-2xl font-semibold">98%</p>
          <p className="mt-1 text-xs text-white/50">Last 30 days</p>
        </div>
      </div>

      <ProfileSummary />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Profiledetails />
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h3 className="text-sm font-semibold text-white/80">Quick actions</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}
