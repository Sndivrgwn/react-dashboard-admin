import Icon from "../../template/Icon";

const products = [
  {
    name: "Lumen Desk Lamp",
    sku: "LP-1023",
    category: "Lighting",
    price: "$89.00",
    stock: "128",
    status: "Active",
  },
  {
    name: "Aura Headphones",
    sku: "AU-8391",
    category: "Audio",
    price: "$249.00",
    stock: "42",
    status: "Low stock",
  },
  {
    name: "Nimbus Chair",
    sku: "NC-4488",
    category: "Furniture",
    price: "$399.00",
    stock: "18",
    status: "Low stock",
  },
  {
    name: "Vanta Backpack",
    sku: "VB-2207",
    category: "Accessories",
    price: "$129.00",
    stock: "210",
    status: "Active",
  },
  {
    name: "Orbit Watch",
    sku: "OW-5520",
    category: "Wearables",
    price: "$189.00",
    stock: "64",
    status: "Active",
  },
  {
    name: "Flux Coffee Kit",
    sku: "FC-9912",
    category: "Kitchen",
    price: "$59.00",
    stock: "0",
    status: "Out of stock",
  },
];

const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-300",
  "Low stock": "bg-amber-500/15 text-amber-300",
  "Out of stock": "bg-rose-500/15 text-rose-300",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Products</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            <Icon name="filter" className="h-4 w-4" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            <Icon name="download" className="h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          >
            <Icon name="plus" className="h-4 w-4" />
            Add product
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Product list</h2>
            <p className="text-sm text-white/50">
              Manage inventory, pricing, and availability.
            </p>
          </div>
          <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">
            <Icon name="search" className="h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="text-left text-white/60">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {products.map((product) => (
                <tr key={product.sku} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-white">
                        {product.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <span className="font-semibold text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70">{product.sku}</td>
                  <td className="px-6 py-4 text-white/70">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4 text-white/70">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={[
                        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                        statusStyles[product.status],
                      ].join(" ")}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
                      aria-label="View product"
                    >
                      <Icon name="eye" className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-white/50">
          <span>Showing 1-6 of 24 results</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Previous
            </button>
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
            <button
              type="button"
              className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
