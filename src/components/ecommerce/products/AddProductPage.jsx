import Icon from "../../template/Icon";

const categories = ["Lighting", "Audio", "Furniture", "Accessories", "Wearables"];
const brands = ["Lumina", "Aura", "Nimbus", "Vanta", "Orbit"];
const colors = ["Midnight", "Slate", "Ivory", "Amber", "Cobalt"];
const availabilityOptions = ["In stock", "Low stock", "Out of stock"];

export default function AddProductPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Add Products</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span>Home</span>
          <span>/</span>
          <span className="text-white/80">Add Products</span>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[2.1fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
              <h2 className="text-base font-semibold text-white">
                Products Description
              </h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    placeholder="Enter product name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="category">
                    Category
                  </label>
              <div className="relative">
                <select
                  id="category"
                  className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="brand">
                Brand
              </label>
              <div className="relative">
                <select
                  id="brand"
                  className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                >
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70" htmlFor="color">
                Color
              </label>
              <div className="relative">
                <select
                  id="color"
                  className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-2 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                />
              </div>
            </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="weight">
                    Weight(KG)
                  </label>
                  <input
                    id="weight"
                    type="text"
                    placeholder="15"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="length">
                    Length(CM)
                  </label>
                  <input
                    id="length"
                    type="text"
                    placeholder="120"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="width">
                    Width(CM)
                  </label>
                  <input
                    id="width"
                    type="text"
                    placeholder="23"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm text-white/70" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Receipt info (optional)"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
              <h2 className="text-base font-semibold text-white">
                Pricing &amp; Availability
              </h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="price">
                    Price
                  </label>
                  <input
                    id="price"
                    type="text"
                    placeholder="$0.00"
                    className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70" htmlFor="stockQuantity">
                    Stock Quantity
                  </label>
                  <div className="flex h-11 items-center rounded-xl border border-white/10 bg-white/5 px-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-lg border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
                    >
                      -
                    </button>
                    <input
                      id="stockQuantity"
                      type="text"
                      placeholder="0"
                      className="mx-2 flex-1 bg-transparent text-center text-white/80 outline-none"
                    />
                    <button
                      type="button"
                      className="h-8 w-8 rounded-lg border border-white/10 text-white/60 transition hover:border-white/20 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label className="text-sm text-white/70" htmlFor="availability">
                  Availability Status
                </label>
                <div className="relative">
                  <select
                    id="availability"
                    className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
                  >
                    <option value="">Select Availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevron-down"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  Products Images
                </h2>
                <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/50">
                  3 max
                </span>
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/60">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-white/70">
                  <Icon name="upload" className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white/80">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-white/50">
                  SVG, PNG, JPG or GIF (MAX 800x400px)
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
              <h2 className="text-base font-semibold text-white">
                Publishing
              </h2>
              <div className="mt-4 space-y-3 text-sm text-white/60">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Visibility</span>
                  <span className="text-white/80">Public</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Schedule</span>
                  <span className="text-white/80">Immediately</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Channel</span>
                  <span className="text-white/80">Online</span>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                >
                  Publish Product
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Save draft
                </button>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
