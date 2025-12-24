const campaigns = [
  {
    product: "Wilson Gouse",
    campaign: "Grow your brand by...",
    channel: "Ads campaign",
    status: "Success",
    color: "bg-emerald-500/15 text-emerald-300",
  },
  {
    product: "Wilson Gouse",
    campaign: "Make better ideas...",
    channel: "Ads campaign",
    status: "Pending",
    color: "bg-amber-500/15 text-amber-300",
  },
  {
    product: "Wilson Gouse",
    campaign: "Increase website tra...",
    channel: "Ads campaign",
    status: "Success",
    color: "bg-emerald-500/15 text-emerald-300",
  },
  {
    product: "Wilson Gouse",
    campaign: "Grow your brand by...",
    channel: "Ads campaign",
    status: "Failed",
    color: "bg-rose-500/15 text-rose-300",
  },
  {
    product: "Wilson Gouse",
    campaign: "Grow your brand by...",
    channel: "Ads campaign",
    status: "Success",
    color: "bg-emerald-500/15 text-emerald-300",
  },
];

const iconStyles = [
  "bg-indigo-500/20 text-indigo-300",
  "bg-cyan-500/20 text-cyan-300",
  "bg-orange-500/20 text-orange-300",
  "bg-rose-500/20 text-rose-300",
  "bg-emerald-500/20 text-emerald-300",
];

export default function BasicTableFour() {
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
        <h2 className="text-lg font-semibold text-white">Basic Table 4</h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/40 px-6 py-4">
          <p className="text-base font-semibold text-white">Featured Campaigns</p>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
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
              <path d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm5.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm5.25 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            More
          </button>
        </div>
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">Products</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {campaigns.map((item, index) => (
              <tr key={`${item.campaign}-${index}`} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold",
                        iconStyles[index % iconStyles.length],
                      ].join(" ")}
                    >
                      WG
                    </div>
                    <span className="font-semibold text-white">
                      {item.product}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-white">{item.campaign}</p>
                  <p className="text-xs text-white/50">{item.channel}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      item.color,
                    ].join(" ")}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
