import { useAuth } from "../../../context/AuthContext"

export default function Profiledetails() {
  const {user} = useAuth()

    return (
        <div className="space-y-6">
          <div className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <p className="mt-1 text-sm text-white/60">
                  Update your personal details.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white">
                Edit
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  First Name
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.first_name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Last Name
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.last_name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Email address
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Phone
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.phone || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Bio
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.bio || "-"}</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[26px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Address</h2>
                <p className="mt-1 text-sm text-white/60">
                  Manage your location details.
                </p>
              </div>
              <button className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white">
                Edit
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Country
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.country || "-"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  City/State
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {user?.city_state || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Postal Code
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.postal_code || "-"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Tax ID
                </p>
                <p className="mt-2 text-sm text-white/80">{user?.tax_id || "-"}</p>
              </div>
            </div>
          </div>
        </div>
    )
}
