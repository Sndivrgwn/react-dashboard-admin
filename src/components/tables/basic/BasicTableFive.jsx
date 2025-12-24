const sales = [
  {
    product: "TailGrids",
    category: "UI Kits",
    country: "United States",
    role: "Dashboard",
    value: "$12,499",
  },
  {
    product: "GrayGrids",
    category: "Templates",
    country: "France",
    role: "Dashboard",
    value: "$5,498",
  },
  {
    product: "Uideck",
    category: "Templates",
    country: "Singapore",
    role: "Dashboard",
    value: "$4,621",
  },
  {
    product: "FormBold",
    category: "SaaS",
    country: "United Kingdom",
    role: "Dashboard",
    value: "$13,843",
  },
  {
    product: "NextAdmin",
    category: "Templates",
    country: "Netherlands",
    role: "Dashboard",
    value: "$7,523",
  },
  {
    product: "Form Builder",
    category: "Templates",
    country: "Finland",
    role: "Dashboard",
    value: "$1,377",
  },
  {
    product: "AyroUI",
    category: "Templates",
    country: "Belgium",
    role: "Dashboard",
    value: "$599",
  },
];

const flagStyles = [
  "bg-rose-500/30",
  "bg-indigo-500/30",
  "bg-emerald-500/30",
  "bg-amber-500/30",
  "bg-cyan-500/30",
  "bg-fuchsia-500/30",
  "bg-sky-500/30",
];

export default function BasicTableFive() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/70">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M5.25 6.75v10.5A2.25 2.25 0 0 0 7.5 19.5h9A2.25 2.25 0 0 0 18.75 17.25V6.75M5.25 6.75V5.25A2.25 2.25 0 0 1 7.5 3h9A2.25 2.25 0 0 1 18.75 5.25v1.5M12 3v16.5" />
          </svg>
        </span>
        <h2 className="text-lg font-semibold text-white">Basic Table 5</h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/40 px-6 py-4">
          <div>
            <p className="text-base font-semibold text-white">Recent Orders</p>
            <p className="text-xs text-white/50">
              Weekly revenue snapshots
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 4.5h18L14.25 12v6.75a.75.75 0 0 1-1.2.6l-3-2.25a.75.75 0 0 1-.3-.6V12L3 4.5Z" />
              </svg>
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              See all
            </button>
          </div>
        </div>
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">Products</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Country</th>
              <th className="px-6 py-4 font-medium">CR</th>
              <th className="px-6 py-4 font-medium">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {sales.map((item, index) => (
              <tr key={item.product} className="hover:bg-white/5">
                <td className="px-6 py-4 font-semibold text-white">
                  {item.product}
                </td>
                <td className="px-6 py-4 text-white/70">{item.category}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "h-3 w-3 rounded-full",
                        flagStyles[index % flagStyles.length],
                      ].join(" ")}
                    />
                    <span className="text-white/70">{item.country}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/70">{item.role}</td>
                <td className="px-6 py-4 font-semibold text-emerald-300">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
