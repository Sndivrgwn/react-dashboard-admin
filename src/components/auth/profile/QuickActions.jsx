import Logout from "../logout/ButtonLogout";

export default function QuickActions() {
    return (
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
    )
}
