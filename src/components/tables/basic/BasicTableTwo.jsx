import Icon from "../../template/Icon";

const orders = [
  {
    id: "DE124321",
    customer: "John Doe",
    email: "johndoe@gmail.com",
    product: "Software License",
    value: "$18,540",
    date: "2024-06-15",
    status: "Complete",
  },
  {
    id: "DE124322",
    customer: "Jane Smith",
    email: "janesmith@gmail.com",
    product: "Cloud Hosting",
    value: "$12,990",
    date: "2024-06-18",
    status: "Pending",
  },
  {
    id: "DE124323",
    customer: "Michael Brown",
    email: "michaelbrown@gmail.com",
    product: "Web Domain",
    value: "$9,500",
    date: "2024-06-20",
    status: "Cancelled",
  },
  {
    id: "DE124324",
    customer: "Alice Johnson",
    email: "alicejohnson@gmail.com",
    product: "SSL Certificate",
    value: "$2,305",
    date: "2024-06-25",
    status: "Pending",
  },
  {
    id: "DE124325",
    customer: "Robert Lee",
    email: "robertlee@gmail.com",
    product: "Premium Support",
    value: "$15,200",
    date: "2024-06-30",
    status: "Complete",
  },
];

const statusStyles = {
  Complete: "bg-emerald-500/15 text-emerald-300",
  Pending: "bg-amber-500/15 text-amber-300",
  Cancelled: "bg-rose-500/15 text-rose-300",
};

export default function BasicTableTwo() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white/70">
          <Icon name="table" className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold text-white">Basic Table 2</h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/40 px-6 py-4">
          <div>
            <p className="text-base font-semibold text-white">Recent Orders</p>
            <p className="text-xs text-white/50">
              Updated in the last 24 hours
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/20 hover:text-white"
            >
              <Icon name="filter" className="h-4 w-4" />
              Filter
            </button>
            <button
              type="button"
              className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-white/90"
            >
              See all
            </button>
          </div>
        </div>
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/60">
            <tr>
              <th className="px-6 py-4 font-medium">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10"
                />
              </th>
              <th className="px-6 py-4 font-medium">Deal ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Product/Service</th>
              <th className="px-6 py-4 font-medium">Deal Value</th>
              <th className="px-6 py-4 font-medium">Close Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/10"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-white/80">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-white">{order.customer}</p>
                  <p className="text-xs text-white/50">{order.email}</p>
                </td>
                <td className="px-6 py-4 text-white/70">{order.product}</td>
                <td className="px-6 py-4">{order.value}</td>
                <td className="px-6 py-4 text-white/70">{order.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[order.status],
                    ].join(" ")}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <button
                      type="button"
                      className="rounded-lg border border-rose-500/30 p-2 text-rose-400 transition hover:border-rose-400/60 hover:text-rose-300"
                      aria-label="Remove"
                    >
                      <Icon name="trash-solid" className="h-4 w-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
