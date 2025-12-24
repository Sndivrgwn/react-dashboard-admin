const transactions = [
  {
    name: "Bought PYPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
  },
  {
    name: "Bought AAPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Pending",
  },
  {
    name: "Sell KKST",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
  },
  {
    name: "Bought FB",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
  },
  {
    name: "Sell AMZN",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Failed",
  },
];

const statusStyles = {
  Success: "bg-emerald-500/15 text-emerald-300",
  Pending: "bg-amber-500/15 text-amber-300",
  Failed: "bg-rose-500/15 text-rose-300",
};

export default function BasicTableThree() {
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
        <h2 className="text-lg font-semibold text-white">Basic Table 3</h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/40 px-6 py-4">
          <p className="text-base font-semibold text-white">
            Latest Transactions
          </p>
          <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-white/50"
            >
              <path d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 9.9 9.9Z" />
            </svg>
            <span className="text-white/40">Search</span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-white/30">Type to filter</span>
          </div>
        </div>
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {transactions.map((item) => (
              <tr key={item.name} className="hover:bg-white/5">
                <td className="px-6 py-4 font-semibold text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-white/70">{item.date}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4 text-white/70">{item.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[item.status],
                    ].join(" ")}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-white/40">...</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-slate-950/40 px-6 py-4 text-xs text-white/50">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-white/60 transition hover:border-white/20 hover:text-white"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900"
            >
              1
            </button>
            <button type="button" className="px-2 text-white/60">
              2
            </button>
            <button type="button" className="px-2 text-white/60">
              3
            </button>
          </div>
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-white/60 transition hover:border-white/20 hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
