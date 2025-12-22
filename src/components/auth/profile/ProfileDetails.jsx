export default function Profiledetails() {
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
                <p className="mt-2 text-sm text-white/80">Musharof</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Last Name
                </p>
                <p className="mt-2 text-sm text-white/80">Chowdhury</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Email address
                </p>
                <p className="mt-2 text-sm text-white/80">
                  randomuser@pimjo.com
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Phone
                </p>
                <p className="mt-2 text-sm text-white/80">+09 363 398 46</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Bio
                </p>
                <p className="mt-2 text-sm text-white/80">Team Manager</p>
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
                <p className="mt-2 text-sm text-white/80">United States</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  City/State
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Phoenix, Arizona, United States
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Postal Code
                </p>
                <p className="mt-2 text-sm text-white/80">ERT 2489</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Tax ID
                </p>
                <p className="mt-2 text-sm text-white/80">AS4568384</p>
              </div>
            </div>
          </div>
        </div>
    )
}
