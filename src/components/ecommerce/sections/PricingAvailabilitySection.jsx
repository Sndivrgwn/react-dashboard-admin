import Icon from "../../template/Icon";
import { useProductForm } from "../../../context/ProductContext";

export default function PricingAvailabilitySection({ availabilityOptions }) {
  const { form, updateField, setAvailability } = useProductForm();

  return (
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
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
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
              value={form.stock_quantity}
              onChange={(event) =>
                updateField("stock_quantity", event.target.value)
              }
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
            value={form.availability_status}
            onChange={(event) => setAvailability(event.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-slate-950/60 px-4 pr-10 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
          >
            <option value="">Select Availability</option>
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
  );
}
