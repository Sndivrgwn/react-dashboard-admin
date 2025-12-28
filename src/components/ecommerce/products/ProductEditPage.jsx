import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../../template/Icon";
import Badge from "../../template/Badge";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SuccessBanner from "../../error/banner/SuccessBanner";
import Field from "../../template/form/Field";
import TextInput from "../../template/form/TextInput";
import NumberInput from "../../template/form/NumberInput";
import SelectInput from "../../template/form/SelectInput";
import Textarea from "../../template/form/Textarea";
import Combobox from "../../template/Combobox";
import { useDetailStore } from "../../../store/detailStore";
import { useCatalog } from "../../../context/CatalogContext";
import { updateProduct } from "../../../services/Product";
import {
  PRODUCT_CHANNEL_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_VISIBILITY_OPTIONS,
  shallowDiff,
  toTitle,
  validateProductPayload,
} from "../../../utils/productForm";

const formatCurrency = (value, currency = "USD") => {
  if (value === null || value === undefined || value === "") return "-";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return String(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numberValue);
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

const resolveImage = (rawImage) => {
  if (!rawImage) return "";
  if (rawImage.startsWith("http")) return rawImage;
  return `http://127.0.0.1:8000/${
    rawImage.startsWith("storage/") ? "" : "storage/"
  }${rawImage}`;
};

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={[
            "rounded-full px-4 py-2 text-sm transition",
            active === tab.id
              ? "bg-white text-slate-900"
              : "border border-white/10 text-white/60 hover:border-white/20 hover:text-white",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ConfirmDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/95 p-6 text-white shadow-2xl shadow-black/60">
        <h3 className="text-lg font-semibold">Discard changes?</h3>
        <p className="mt-2 text-sm text-white/60">
          You have unsaved changes. Are you sure you want to discard them?
        </p>
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
          >
            Continue editing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { brands, categories, loadCatalog } = useCatalog();
  const productDetail = useDetailStore((state) => state.productDetail);
  const productLoading = useDetailStore((state) => state.productLoading);
  const productError = useDetailStore((state) => state.productError);
  const fetchProductDetail = useDetailStore((state) => state.fetchProductDetail);
  const clearProductDetail = useDetailStore((state) => state.clearProductDetail);
  const [activeTab, setActiveTab] = useState("overview");
  const [draft, setDraft] = useState(null);
  const [initialDraft, setInitialDraft] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!productDetail) return;
    setImagePreview(resolveImage(productDetail.image));
    setImageFile(null);
    setTouched({});
    const nextDraft = {
      name: productDetail.name || "",
      sku: productDetail.SKU || productDetail.sku || "",
      category_id: productDetail.category?.id || productDetail.category_id || "",
      brand_id: productDetail.brand?.id || productDetail.brand_id || "",
      description: productDetail.description || "",
      price: productDetail.price ?? "",
      compare_at_price: productDetail.compare_at_price ?? "",
      currency: productDetail.currency || "USD",
      stock_quantity: productDetail.stock_quantity ?? "",
      status: productDetail.status || "draft",
      visibility: productDetail.visibility || "private",
      channel: productDetail.channel || "online",
      scheduled_at: productDetail.scheduled_at || "",
      weight_kg: productDetail.weight_kg ?? "",
      length_cm: productDetail.length_cm ?? "",
      width_cm: productDetail.width_cm ?? "",
      height_cm: productDetail.height_cm ?? "",
    };
    setDraft(nextDraft);
    setInitialDraft(nextDraft);
  }, [productDetail]);

  const buildChangedPayload = useCallback(() => {
    if (!draft || !initialDraft) return {};
    return shallowDiff(draft, initialDraft);
  }, [draft, initialDraft]);

  const changedPayload = useMemo(
    () => buildChangedPayload(),
    [buildChangedPayload]
  );

  const filteredChangedPayload = useMemo(() => {
    return Object.fromEntries(
      Object.entries(changedPayload).filter(([key]) => touched[key])
    );
  }, [changedPayload, touched]);

  const isDirty = useMemo(() => {
    return Object.keys(filteredChangedPayload).length > 0 || Boolean(imageFile);
  }, [filteredChangedPayload, imageFile]);

  useEffect(() => {
    fetchProductDetail(id);
    loadCatalog();
    return () => clearProductDetail();
  }, [fetchProductDetail, clearProductDetail, id, loadCatalog]);

  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const validateDraft = useCallback((payload) => {
    return validateProductPayload(payload);
  }, []);

  useEffect(() => {
    if (!draft) return;
    setFormErrors(validateDraft(filteredChangedPayload));
  }, [draft, filteredChangedPayload, validateDraft]);

  const handleChange = (field) => (event) => {
    setDraft((prev) => ({ ...prev, [field]: event.target.value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const stockVariant = (() => {
    const quantity = Number(draft?.stock_quantity ?? 0);
    if (quantity <= 0) return "out_of_stock";
    if (quantity <= 5) return "low_stock";
    return "in_stock";
  })();

  const stockLabel =
    stockVariant === "out_of_stock"
      ? "Out of stock"
      : stockVariant === "low_stock"
        ? "Low stock"
        : "In stock";

  const dimensionsValue =
    draft?.length_cm || draft?.width_cm
      ? draft?.height_cm
        ? `${draft?.length_cm || "-"} × ${draft?.width_cm || "-"} × ${draft?.height_cm || "-"}`
        : `${draft?.length_cm || "-"} × ${draft?.width_cm || "-"}`
      : "-";

  const categoryOptions = categories;
  const brandOptions = brands;

  const handleSave = async () => {
    if (!draft) return;
    const errors = validateDraft(filteredChangedPayload);
    if (!Object.keys(filteredChangedPayload).length && imageFile) {
      setFormErrors({});
    } else {
      setFormErrors(errors);
      if (Object.keys(errors).length) return;
    }
    setIsSaving(true);
    setSaveError("");
    try {
      const payload = {};
      Object.entries(filteredChangedPayload).forEach(([key, value]) => {
        switch (key) {
          case "sku":
            payload.SKU = value;
            break;
          case "category_id":
          case "brand_id":
            payload[key] = value ? Number(value) : null;
            break;
          case "price":
          case "compare_at_price":
            payload[key] = value !== "" ? Number(value) : null;
            break;
          case "stock_quantity":
            payload[key] = value !== "" ? Number(value) : null;
            break;
          case "weight_kg":
          case "length_cm":
          case "width_cm":
          case "height_cm":
            payload[key] = value !== "" ? Number(value) : null;
            break;
          case "scheduled_at":
            payload[key] = draft.status === "scheduled" ? value : null;
            break;
          default:
            payload[key] = value;
        }
      });

      if (imageFile) {
        payload.image = imageFile;
      }

      await updateProduct(id, payload);
      setSuccessMessage("Product updated.");
      setTimeout(() => {
        navigate(`/ecommerce/products/${id}`);
      }, 900);
    } catch (error) {
      setSaveError(
        error?.response?.data?.message || "Unable to save product changes."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const requestNavigate = (path) => {
    if (isDirty) {
      setPendingAction(() => () => navigate(path));
      setShowConfirm(true);
      return;
    }
    navigate(path);
  };

  if (productLoading || !draft) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
        <div className="text-sm text-white/60">Loading product...</div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
        <ErrorBanner message={productError} />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "pricing", label: "Pricing" },
    { id: "inventory", label: "Inventory" },
    { id: "media", label: "Media" },
    { id: "logistics", label: "Logistics" },
    { id: "visibility", label: "Visibility" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm text-white/50">
              <button
                type="button"
                onClick={() => requestNavigate("/ecommerce/products")}
                className="text-white/60 transition hover:text-white"
              >
                Products
              </button>{" "}
              / {productDetail?.name || "-"} / Edit
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold">Edit product</h1>
              {isDirty ? <span className="h-2 w-2 rounded-full bg-amber-400" /> : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                requestNavigate(`/ecommerce/products/${id}`);
              }}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || Object.keys(formErrors).length || isSaving}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>

      {saveError ? <ErrorBanner message={saveError} /> : null}
      {successMessage ? <SuccessBanner message={successMessage} /> : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={formErrors.name}>
                <TextInput
                  value={draft.name}
                  onChange={handleChange("name")}
                  ariaInvalid={Boolean(formErrors.name)}
                  placeholder="Product name"
                />
              </Field>
              <Field
                label="SKU"
                helperText="Changing SKU may affect integrations."
              >
                <TextInput
                  value={draft.sku}
                  onChange={handleChange("sku")}
                  placeholder="SKU"
                />
              </Field>
              <div className="space-y-2">
                <Combobox
                  id="edit-category"
                  label="Category"
                  value={draft.category_id}
                  onChange={(value) =>
                    handleChange("category_id")({
                      target: { value },
                    })
                  }
                  options={categoryOptions}
                  placeholder="Select category"
                />
                {formErrors.category_id ? (
                  <span className="text-xs text-rose-300" aria-live="polite">
                    {formErrors.category_id}
                  </span>
                ) : null}
              </div>
              <div className="space-y-2">
                <Combobox
                  id="edit-brand"
                  label="Brand"
                  value={draft.brand_id}
                  onChange={(value) =>
                    handleChange("brand_id")({
                      target: { value },
                    })
                  }
                  options={brandOptions}
                  placeholder="Select brand"
                />
                {formErrors.brand_id ? (
                  <span className="text-xs text-rose-300" aria-live="polite">
                    {formErrors.brand_id}
                  </span>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Description"
                  helperText={`${draft.description.length} characters`}
                >
                  <Textarea
                    value={draft.description}
                    onChange={handleChange("description")}
                    placeholder="Describe the product"
                  />
                </Field>
              </div>
            </div>
          ) : null}

          {activeTab === "pricing" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Price" error={formErrors.price}>
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.price}
                  onChange={handleChange("price")}
                  ariaInvalid={Boolean(formErrors.price)}
                />
              </Field>
              <Field label="Compare-at price">
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.compare_at_price}
                  onChange={handleChange("compare_at_price")}
                />
              </Field>
              <Field label="Currency">
                <TextInput
                  value={draft.currency}
                  onChange={handleChange("currency")}
                />
              </Field>
            </div>
          ) : null}

          {activeTab === "inventory" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Stock quantity" error={formErrors.stock_quantity}>
                <NumberInput
                  type="number"
                  min="0"
                  value={draft.stock_quantity}
                  onChange={handleChange("stock_quantity")}
                  ariaInvalid={Boolean(formErrors.stock_quantity)}
                />
              </Field>
              <Field label="Stock status">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <Badge label={stockLabel} variant={stockVariant} />
                </div>
              </Field>
            </div>
          ) : null}

          {activeTab === "visibility" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Status">
                <SelectInput
                  value={draft.status}
                  onChange={handleChange("status")}
                  options={PRODUCT_STATUS_OPTIONS}
                />
              </Field>
              <Field label="Visibility">
                <SelectInput
                  value={draft.visibility}
                  onChange={handleChange("visibility")}
                  options={PRODUCT_VISIBILITY_OPTIONS}
                />
              </Field>
              <Field label="Channel">
                <SelectInput
                  value={draft.channel}
                  onChange={handleChange("channel")}
                  options={PRODUCT_CHANNEL_OPTIONS}
                />
              </Field>
              {draft.status === "scheduled" ? (
                <Field label="Scheduled at">
                  <TextInput
                    type="datetime-local"
                    value={draft.scheduled_at}
                    onChange={handleChange("scheduled_at")}
                  />
                </Field>
              ) : null}
            </div>
          ) : null}

          {activeTab === "logistics" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Weight (kg)" error={formErrors.weight_kg}>
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.weight_kg}
                  onChange={handleChange("weight_kg")}
                  ariaInvalid={Boolean(formErrors.weight_kg)}
                />
              </Field>
              <Field label="Length (cm)" error={formErrors.length_cm}>
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.length_cm}
                  onChange={handleChange("length_cm")}
                  ariaInvalid={Boolean(formErrors.length_cm)}
                />
              </Field>
              <Field label="Width (cm)" error={formErrors.width_cm}>
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.width_cm}
                  onChange={handleChange("width_cm")}
                  ariaInvalid={Boolean(formErrors.width_cm)}
                />
              </Field>
              <Field label="Height (cm)" error={formErrors.height_cm}>
                <NumberInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.height_cm}
                  onChange={handleChange("height_cm")}
                  ariaInvalid={Boolean(formErrors.height_cm)}
                />
              </Field>
              <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
                Dimensions: {dimensionsValue === "-" ? "-" : `${dimensionsValue} cm`}
              </div>
            </div>
          ) : null}

          {activeTab === "media" ? (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={draft.name || "Product image"}
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center text-sm text-white/40">
                    No product image
                  </div>
                )}
              </div>
              <Field label="Update image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-white/20"
                />
              </Field>
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Live preview</h4>
            <div className="mt-3 space-y-2 text-sm text-white/60">
              <div className="flex items-center justify-between">
                <span>Name</span>
                <span className="text-white">{draft.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SKU</span>
                <span className="text-white">{draft.sku || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status</span>
                <Badge label={toTitle(draft.status)} variant={draft.status} />
              </div>
              <div className="flex items-center justify-between">
                <span>Price</span>
                <span className="text-white">
                  {formatCurrency(draft.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stock</span>
                <Badge label={stockLabel} variant={stockVariant} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
            <h4 className="text-sm font-semibold text-white">Metadata</h4>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Created at</span>
                <span className="font-mono text-white/70">
                  {formatDateTime(productDetail?.created_at)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated at</span>
                <span className="font-mono text-white/70">
                  {formatDateTime(productDetail?.updated_at)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Scheduled at</span>
                <span className="font-mono text-white/70">
                  {productDetail?.scheduled_at
                    ? formatDateTime(productDetail?.scheduled_at)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          } else {
            navigate(`/ecommerce/products/${id}`);
          }
        }}
      />
    </div>
  );
}
