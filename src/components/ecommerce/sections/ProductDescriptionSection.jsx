import Combobox from "../../template/Combobox";
import { useProductForm } from "../../../context/ProductContext";

export default function ProductDescriptionSection({
  categories,
  brands,
  colorOptions,
}) {
  const { form, updateField } = useProductForm();

  return (
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
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
          />
        </div>
        <Combobox
          id="category"
          label="Category"
          value={form.category_id}
          onChange={(value) => updateField("category_id", value)}
          options={categories}
          placeholder="Select a category"
        />
        <Combobox
          id="brand"
          label="Brand"
          value={form.brand_id}
          onChange={(value) => updateField("brand_id", value)}
          options={brands || []}
          placeholder="Select a brand"
        />
        <Combobox
          id="color"
          label="Color"
          value={form.color}
          onChange={(value) => updateField("color", value)}
          options={colorOptions}
          placeholder="Select color"
          showSwatch
        />
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
            value={form.weight_kg}
            onChange={(event) => updateField("weight_kg", event.target.value)}
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
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
            value={form.length_cm}
            onChange={(event) => updateField("length_cm", event.target.value)}
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
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
            value={form.width_cm}
            onChange={(event) => updateField("width_cm", event.target.value)}
            className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
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
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-white/20"
        />
      </div>
    </div>
  );
}
