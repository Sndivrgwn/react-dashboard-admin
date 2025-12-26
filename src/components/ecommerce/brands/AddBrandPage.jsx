import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../template/Icon";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SuccessBanner from "../../error/banner/SuccessBanner";
import LoadingOverlay from "../../template/LoadingOverlay";
import { useCatalog } from "../../../context/CatalogContext";

export default function AddBrandPage() {
  const [formState, setFormState] = useState({ name: "", notes: "" });
  const { addBrand, isSaving, saveError, saveMessage, clearSaveState } =
    useCatalog();
  const navigate = useNavigate();

  useEffect(() => {
    clearSaveState();
    return () => clearSaveState();
  }, [clearSaveState]);

  useEffect(() => {
    if (!saveMessage) return;
    const timeoutId = setTimeout(() => {
      navigate("/ecommerce/brands");
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, [saveMessage, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addBrand({
      name: formState.name,
      description: formState.notes || undefined,
    });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      {isSaving ? <LoadingOverlay message="Saving brand..." /> : null}
      {saveError ? <ErrorBanner message={saveError} /> : null}
      {saveMessage ? <SuccessBanner message={saveMessage} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Add Brand</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span>Home</span>
          <span>/</span>
          <span className="text-white/80">Add Brand</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/70" htmlFor="brand-name">
              Brand name
            </label>
            <input
              id="brand-name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
          <div>
            <label className="text-sm text-white/70" htmlFor="brand-notes">
              Notes (optional)
            </label>
            <textarea
              id="brand-notes"
              name="notes"
              rows={4}
              value={formState.notes}
              onChange={handleChange}
              placeholder="Add a short description"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20 focus:ring-4 focus:ring-white/10"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Link
            to="/ecommerce/brands"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon name="plus" className="h-4 w-4" />
            Save brand
          </button>
        </div>
      </form>
    </div>
  );
}
