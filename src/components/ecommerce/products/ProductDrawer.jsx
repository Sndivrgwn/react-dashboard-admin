import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../template/Icon";
import Badge from "../../template/Badge";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SlideOver from "../../template/SlideOver";
import ImageLightbox from "../../template/ImageLightbox";
import Field from "../../template/form/Field";
import NumberInput from "../../template/form/NumberInput";
import SelectInput from "../../template/form/SelectInput";
import Combobox from "../../template/Combobox";
import { useCatalog } from "../../../context/CatalogContext";
import { useDetailStore } from "../../../store/detailStore";
import { updateProduct } from "../../../services/Product";
import {
  PRODUCT_CHANNEL_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_VISIBILITY_OPTIONS,
  shallowDiff,
  toTitle,
  validateProductPayload,
} from "../../../utils/productForm";

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) return String(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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

function StickyFooter({ children }) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-6 border-t border-white/10 bg-slate-900/95 px-6 py-4 backdrop-blur">
      {children}
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

function Section({ title, children }) {
  return (
    <section className="border-t border-white/10 pt-5">
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function StatCard({ label, value, badge }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase text-white/40">{label}</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-white">{value}</p>
        {badge ? <Badge label={badge.label} variant={badge.variant} /> : null}
      </div>
    </div>
  );
}

export default function ProductDrawer({ isOpen, onClose, product }) {
  const { brands, categories, loadCatalog } = useCatalog();
  const productDetail = useDetailStore((state) => state.productDetail);
  const productLoading = useDetailStore((state) => state.productLoading);
  const productError = useDetailStore((state) => state.productError);
  const fetchProductDetail = useDetailStore((state) => state.fetchProductDetail);
  const clearProductDetail = useDetailStore((state) => state.clearProductDetail);
  const [showDescription, setShowDescription] = useState(false);
  const [copiedSku, setCopiedSku] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReadonly, setShowReadonly] = useState(false);
  const menuRef = useRef(null);

  const productId =
    product?.id || product?.product_id || product?.uuid || product?.SKU || product?.sku;

  useEffect(() => {
    if (!isOpen || !productId) return;
    fetchProductDetail(productId);
    loadCatalog();
  }, [isOpen, productId, fetchProductDetail, loadCatalog]);

  useEffect(() => {
    if (!isOpen) return;
    setShowDescription(false);
    setCopiedSku(false);
    setIsMenuOpen(false);
    setIsEditing(false);
    setDraft(null);
    setFormErrors({});
    setIsSaving(false);
    setSaveError("");
    setShowConfirm(false);
    setShowReadonly(false);
  }, [isOpen, productId]);

  const detail = productDetail || product;
  const detailImages = useMemo(() => {
    const images = (detail?.product_images || [])
      .map((image) =>
        resolveImage(typeof image === "string" ? image : image?.path)
      )
      .filter(Boolean);
    if (images.length) return images;
    const fallback = resolveImage(
      detail?.image_url ||
        detail?.image ||
        detail?.thumbnail ||
        detail?.photo ||
        ""
    );
    return fallback ? [fallback] : [];
  }, [detail]);
  const detailImage = detailImages[0] || "";
  const stockQuantity = Number(detail?.stock_quantity ?? detail?.stock ?? 0);
  const stockVariant =
    stockQuantity <= 0 ? "out_of_stock" : stockQuantity <= 5 ? "low_stock" : "in_stock";
  const stockLabel =
    stockVariant === "out_of_stock"
      ? "Out of stock"
      : stockVariant === "low_stock"
        ? "Low stock"
        : "In stock";

  const statusVariant = (detail?.status || "draft").toLowerCase();
  const statusLabel = toTitle(detail?.status || "draft");
  const lengthValue = detail?.length_cm ?? detail?.length;
  const widthValue = detail?.width_cm ?? detail?.width;
  const heightValue = detail?.height_cm ?? detail?.height;
  const dimensionsValue = lengthValue || widthValue
    ? heightValue
      ? `${lengthValue || "-"} x ${widthValue || "-"} x ${heightValue || "-"}`
      : `${lengthValue || "-"} x ${widthValue || "-"}`
    : "-";

  useEffect(() => {
    if (!isEditing || !detail) return;
    setDraft((prev) =>
      prev || {
        price: detail.price ?? detail.rawPrice ?? "",
        stock_quantity: detail.stock_quantity ?? detail.stock ?? "",
        status: detail.status || "draft",
        visibility: detail.visibility || "private",
        channel: detail.channel || "online",
        category_id: detail.category?.id || detail.category_id || "",
        brand_id: detail.brand?.id || detail.brand_id || "",
      }
    );
  }, [isEditing, detail]);

  const handleCopySku = async () => {
    if (!detail?.SKU && !detail?.sku) return;
    const skuValue = detail?.SKU || detail?.sku;
    try {
      await navigator.clipboard.writeText(skuValue);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = skuValue;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedSku(true);
    window.setTimeout(() => setCopiedSku(false), 1200);
  };

  const isDirty = useMemo(() => {
    if (!draft || !detail) return false;
    const next = {
      price: draft.price ?? "",
      stock_quantity: draft.stock_quantity ?? "",
      status: draft.status ?? "",
      visibility: draft.visibility ?? "",
      channel: draft.channel ?? "",
      category_id: draft.category_id ?? "",
      brand_id: draft.brand_id ?? "",
    };
    const original = {
      price: detail.price ?? detail.rawPrice ?? "",
      stock_quantity: detail.stock_quantity ?? detail.stock ?? "",
      status: detail.status || "draft",
      visibility: detail.visibility || "private",
      channel: detail.channel || "online",
      category_id: detail.category?.id || detail.category_id || "",
      brand_id: detail.brand?.id || detail.brand_id || "",
    };
    return Object.keys(shallowDiff(next, original)).length > 0;
  }, [draft, detail]);

  const validateDraft = useCallback((payload) => {
    return validateProductPayload(payload);
  }, []);

  useEffect(() => {
    if (!draft) return;
    setFormErrors(validateDraft(draft));
  }, [draft, validateDraft]);

  const handleDraftChange = (field) => (event) => {
    const value = event.target.value;
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event) => {
      if (event.key !== "Escape") return;
      if (isEditing && isDirty) {
        setShowConfirm(true);
        return;
      }
      onClose();
      clearProductDetail();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, isEditing, isDirty, onClose, clearProductDetail]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMenuOpen]);

  const categoryOptions = categories;
  const brandOptions = brands;

  const handleSave = async () => {
    if (!draft || !detail) return;
    const errors = validateDraft(draft);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    setIsSaving(true);
    setSaveError("");
    try {
      await updateProduct(detail.id || detail.productId, {
        price: Number(draft.price),
        stock_quantity: Number(draft.stock_quantity),
        status: draft.status,
        visibility: draft.visibility,
        channel: draft.channel,
        category_id: Number(draft.category_id),
        brand_id: Number(draft.brand_id),
      });
      await fetchProductDetail(detail.id || detail.productId);
      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error?.response?.data?.message || "Unable to save product changes."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SlideOver
        isOpen={isOpen}
        title={
          <div className="flex items-center gap-2">
            <span>Product details</span>
            {isEditing ? (
              <span className="text-xs font-semibold text-amber-200">
                Editing
              </span>
            ) : null}
            {isEditing && isDirty ? (
              <span className="h-2 w-2 rounded-full bg-amber-400" />
            ) : null}
          </div>
        }
        onClose={() => {
          if (isEditing && isDirty) {
            setShowConfirm(true);
            return;
          }
          onClose();
          clearProductDetail();
        }}
      >
        {productError ? <ErrorBanner message={productError} /> : null}
        {saveError ? <ErrorBanner message={saveError} /> : null}
        {productLoading ? (
          <div className="text-sm text-white/60">Loading details...</div>
        ) : detail ? (
          <div className="space-y-6 text-sm text-white/70">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
              <div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {detailImage ? (
                    <button
                      type="button"
                      onClick={() => setIsImageOpen(true)}
                      className="group relative h-56 w-full overflow-hidden"
                      aria-label="View full image"
                    >
                      <img
                        src={detailImage}
                        alt={detail.name}
                        className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                    </button>
                  ) : (
                    <div className="flex h-56 items-center justify-center text-sm text-white/40">
                      No product image
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {(detailImages.length ? detailImages.slice(0, 3) : [null, null, null]).map((image, index) => (
                    <div
                      key={`thumb-${index}`}
                      className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                    >
                      {image ? (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveImage(image);
                            setIsImageOpen(true);
                          }}
                          className="group relative h-16 w-full overflow-hidden"
                          aria-label={`View ${detail.name} thumbnail`}
                        >
                          <img
                            src={image}
                            alt={`${detail.name} thumbnail ${index + 1}`}
                            className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                        </button>
                      ) : (
                        <div className="flex h-16 items-center justify-center text-xs text-white/40">
                          -
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-semibold text-white">
                      {detail.name}
                    </h1>
                    <Badge label={statusLabel} variant={statusVariant} />
                    <Badge label={stockLabel} variant={stockVariant} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/60">
                    <span>SKU: {detail.SKU || detail.sku || "-"}</span>
                    <button
                      type="button"
                      onClick={handleCopySku}
                      disabled={!detail?.SKU && !detail?.sku}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Copy SKU"
                    >
                      <Icon name="clipboard" className="h-3.5 w-3.5" />
                      Copy
                    </button>
                    {copiedSku ? (
                      <span className="text-xs text-emerald-300">Copied</span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-white/50">
                    {detail.category?.name ||
                      detail.category_name ||
                      detail.category ||
                      "-"}{" "}
                    ·{" "}
                    {detail.brand?.name ||
                      detail.brand_name ||
                      detail.brand ||
                      "-"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    disabled={isEditing}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon name="pencil" className="h-4 w-4" />
                    {isEditing ? "Editing" : "Edit"}
                  </button>
                  <Link
                    to={`/ecommerce/products/${detail.id || detail.productId || ""}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    View full page
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen((prev) => !prev)}
                      className="list-none rounded-xl border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      aria-label="More actions"
                      aria-expanded={isMenuOpen}
                    >
                      <Icon name="dots" className="h-4 w-4" />
                    </button>
                    {isMenuOpen ? (
                      <div className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-sm shadow-xl">
                        <button
                          type="button"
                          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          Duplicate
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {detail.status === "archived"
                            ? "Unarchive"
                            : "Archive"}
                        </button>
                        <button
                          type="button"
                          className="flex w-full items-center rounded-xl px-3 py-2 text-left text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {detail.status === "published" ? "Disable" : "Enable"}
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {isEditing ? (
              <Section title="Quick edit">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Price" error={formErrors.price}>
                    <div className="relative">
                      <NumberInput
                        min="0"
                        step="0.01"
                        value={draft?.price ?? ""}
                        onChange={handleDraftChange("price")}
                        ariaInvalid={Boolean(formErrors.price)}
                        className="pr-14"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                        USD
                      </span>
                    </div>
                  </Field>
                  <Field
                    label="Stock quantity"
                    error={formErrors.stock_quantity}
                  >
                    <NumberInput
                      min="0"
                      value={draft?.stock_quantity ?? ""}
                      onChange={handleDraftChange("stock_quantity")}
                      ariaInvalid={Boolean(formErrors.stock_quantity)}
                    />
                  </Field>
                  <Field label="Status" error={formErrors.status}>
                    <SelectInput
                      value={draft?.status ?? "draft"}
                      onChange={handleDraftChange("status")}
                      ariaInvalid={Boolean(formErrors.status)}
                      options={PRODUCT_STATUS_OPTIONS}
                    />
                  </Field>
                  <Field label="Visibility" error={formErrors.visibility}>
                    <SelectInput
                      value={draft?.visibility ?? "private"}
                      onChange={handleDraftChange("visibility")}
                      ariaInvalid={Boolean(formErrors.visibility)}
                      options={PRODUCT_VISIBILITY_OPTIONS}
                    />
                  </Field>
                  <Field label="Channel" error={formErrors.channel}>
                    <SelectInput
                      value={draft?.channel ?? "online"}
                      onChange={handleDraftChange("channel")}
                      ariaInvalid={Boolean(formErrors.channel)}
                      options={PRODUCT_CHANNEL_OPTIONS}
                    />
                  </Field>
                  <div className="space-y-2">
                    <Combobox
                      id="drawer-category"
                      label="Category"
                      value={draft?.category_id ?? ""}
                      onChange={(value) =>
                        handleDraftChange("category_id")({
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
                      id="drawer-brand"
                      label="Brand"
                      value={draft?.brand_id ?? ""}
                      onChange={(value) =>
                        handleDraftChange("brand_id")({
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
                </div>
              </Section>
            ) : (
              <Section title="Commercial snapshot">
                <div className="grid gap-4 sm:grid-cols-2">
                  <StatCard
                    label="Price"
                    value={formatCurrency(detail.price ?? detail.rawPrice)}
                  />
                  <StatCard
                    label="Stock quantity"
                    value={detail.stock_quantity ?? detail.stock ?? "-"}
                  />
                  <StatCard
                    label="Visibility"
                    value={toTitle(detail.visibility)}
                    badge={{
                      label: toTitle(detail.visibility),
                      variant: detail.visibility,
                    }}
                  />
                  <StatCard
                    label="Channel"
                    value={toTitle(detail.channel)}
                    badge={{
                      label: toTitle(detail.channel),
                      variant: detail.channel,
                    }}
                  />
                </div>
              </Section>
            )}

            <Section title="Details">
              <button
                type="button"
                onClick={() => setShowReadonly((prev) => !prev)}
                className="text-xs font-semibold text-white/60 transition hover:text-white"
                aria-expanded={showReadonly}
              >
                {showReadonly ? "Hide details" : "Show details"}
              </button>
              {showReadonly ? (
                <div className="mt-4 space-y-4 text-sm text-white/60">
                  <div className="flex items-center justify-between">
                    <span>Weight</span>
                    <span className="text-white">
                      {detail.weight_kg ?? "-"} kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dimensions</span>
                    <span className="text-white">
                      {dimensionsValue === "-" ? "-" : `${dimensionsValue} cm`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Created at</span>
                    <span className="font-mono text-white/70">
                      {formatDateTime(detail.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Updated at</span>
                    <span className="font-mono text-white/70">
                      {formatDateTime(detail.updated_at)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-white/40">
                      Description
                    </p>
                    <p className="mt-2 text-white/70">
                      {detail.description || "No description."}
                    </p>
                  </div>
                  <Link
                    to={`/ecommerce/products/${detail.id || detail.productId || ""}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
                  >
                    Edit more in full page
                    <Icon name="arrow-right" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : null}
            </Section>

            {!isEditing ? (
              <Section title="Description">
                {detail.description ? (
                  <>
                    <p
                      className={[
                        "text-sm text-white/70",
                        showDescription ? "" : "max-h-16 overflow-hidden",
                      ].join(" ")}
                    >
                      {detail.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowDescription((prev) => !prev)}
                      aria-expanded={showDescription}
                      className="mt-2 text-xs font-semibold text-white/60 transition hover:text-white"
                    >
                      {showDescription ? "Show less" : "Show more"}
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-white/50">No description.</p>
                )}
              </Section>
            ) : null}

            {!isEditing ? (
              <Section title="Metadata">
                <div className="grid gap-3 text-xs text-white/60">
                  <div className="flex items-center justify-between">
                    <span>Created at</span>
                    <span className="font-mono text-white/70">
                      {formatDateTime(detail.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Updated at</span>
                    <span className="font-mono text-white/70">
                      {formatDateTime(detail.updated_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Scheduled at</span>
                    <span className="font-mono text-white/70">
                      {detail.scheduled_at
                        ? formatDateTime(detail.scheduled_at)
                        : "-"}
                    </span>
                  </div>
                </div>
              </Section>
            ) : null}

            {isEditing ? (
              <StickyFooter>
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (isDirty) {
                        setShowConfirm(true);
                        return;
                      }
                      setIsEditing(false);
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
              </StickyFooter>
            ) : null}
          </div>
        ) : null}
      </SlideOver>
      <ConfirmDialog
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          setIsEditing(false);
          setDraft(null);
          setFormErrors({});
          setSaveError("");
        }}
      />
      <ImageLightbox
        isOpen={isImageOpen}
        src={activeImage || detailImage}
        alt={detail?.name}
        onClose={() => setIsImageOpen(false)}
      />
    </>
  );
}
