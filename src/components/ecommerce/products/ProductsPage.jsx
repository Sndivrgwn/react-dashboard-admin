import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../template/Icon";
import DataTableCard from "../../tables/data/DataTableCard";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SlideOver from "../../template/SlideOver";
import { useProducts } from "../../../context/ProductsContext";
import { useDetailStore } from "../../../store/detailStore";
import AddButton from "../sections/AddButton";
import FilterButton from "../sections/FilterButton";
import ExportButton from "../sections/ExportButton";

const statusStyles = {
  "in stock": "bg-emerald-500/15 text-emerald-300",
  "out of stock": "bg-rose-500/15 text-rose-300",
  preorder: "bg-amber-500/15 text-amber-300",
};

const availabilityLabels = {
  in_stock: "In stock",
  out_of_stock: "Out of stock",
  preorder: "Preorder",
};

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

const badgeStyles = {
  published: "bg-emerald-500/15 text-emerald-200",
  draft: "bg-amber-500/15 text-amber-200",
  archived: "bg-slate-500/20 text-slate-200",
  in_stock: "bg-emerald-500/15 text-emerald-200",
  low_stock: "bg-amber-500/15 text-amber-200",
  out_of_stock: "bg-rose-500/15 text-rose-200",
  private: "bg-slate-500/20 text-slate-200",
  public: "bg-emerald-500/15 text-emerald-200",
  unlisted: "bg-amber-500/15 text-amber-200",
  online: "bg-sky-500/15 text-sky-200",
  offline: "bg-slate-500/20 text-slate-200",
};

const toTitle = (value) =>
  value
    ? value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "-";

function Badge({ label, variant }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        badgeStyles[variant] || "bg-white/10 text-white/70",
      ].join(" ")}
    >
      {label}
    </span>
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

export default function ProductsPage() {
  const { products, isLoading, errorMessage, loadProducts } = useProducts();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [copiedSku, setCopiedSku] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const productDetail = useDetailStore((state) => state.productDetail);
  const productLoading = useDetailStore((state) => state.productLoading);
  const productError = useDetailStore((state) => state.productError);
  const fetchProductDetail = useDetailStore(
    (state) => state.fetchProductDetail
  );
  const clearProductDetail = useDetailStore(
    (state) => state.clearProductDetail
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const rows = useMemo(() => {
    const apiHost = "http://127.0.0.1:8000";
    return products.map((product) => {
      const availabilityKey = String(
        product.availability_status || product.status || ""
      )
        .replace(/_/g, " ")
        .toLowerCase();
      const rawImage =
        product.image_url ||
        product.image ||
        product.thumbnail ||
        product.photo ||
        "";
      const imageSrc = rawImage
        ? rawImage.startsWith("http")
          ? rawImage
          : `${apiHost}/${rawImage.startsWith("storage/") ? "" : "storage/"}${rawImage}`
        : "";
      const initials = (product.name || "-")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
      return {
        id: product.id || product.SKU || product.sku || product.name,
        productId:
          product.id || product.product_id || product.uuid || product.sku,
        name: product.name || "-",
        sku: product.SKU || product.sku || "-",
        brand:
          product.brand?.name || product.brand_name || product.brand || "-",
        category:
          product.category?.name ||
          product.category_name ||
          product.category ||
          "-",
        price: formatCurrency(product.price),
        stock: product.stock_quantity ?? product.stock ?? "-",
        description: product.description || "-",
        availabilityKey,
        imageSrc,
        initials,
        availabilityLabel:
          availabilityLabels[product.availability_status] ||
          availabilityLabels[product.status] ||
          product.availability_status ||
          product.status ||
          "-",
      };
    });
  }, [products]);

  const resolveImage = (rawImage) => {
    if (!rawImage) return "";
    if (rawImage.startsWith("http")) return rawImage;
    return `http://127.0.0.1:8000/${
      rawImage.startsWith("storage/") ? "" : "storage/"
    }${rawImage}`;
  };

  const detail = productDetail || selectedProduct;
  const detailImage = resolveImage(
    detail?.image_url ||
      detail?.image ||
      detail?.thumbnail ||
      detail?.photo ||
      ""
  );
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
      ? `${lengthValue || "-"} × ${widthValue || "-"} × ${heightValue || "-"}`
      : `${lengthValue || "-"} × ${widthValue || "-"}`
    : "-";

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

  useEffect(() => {
    setShowDescription(false);
    setCopiedSku(false);
    setIsMenuOpen(false);
  }, [detail?.id]);

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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Products</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton/>
          <ExportButton/>
          <AddButton title="Add Product" to="/ecommerce/product/add"/>
        </div>
      </div>

      <DataTableCard
        title="Product list"
        description="Manage inventory, pricing, and availability."
        toolbar={
          <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">
            <Icon name="search" className="h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/40"
            />
          </div>
        }
        footer={
          <>
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
          </>
        }
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-white/60"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageSrc ? (
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className="h-10 w-10 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-semibold text-white">
                            {product.initials || "--"}
                          </div>
                        )}
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
                          "inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
                          statusStyles[product.availabilityKey] ||
                            "bg-white/10 text-white/60",
                        ].join(" ")}
                      >
                        {product.availabilityLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDetailOpen(true);
                          fetchProductDetail(product.productId);
                        }}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
                        aria-label="View product"
                      >
                        <Icon name="eye" className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-white/60"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DataTableCard>
      <SlideOver
        isOpen={isDetailOpen}
        title="Product details"
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedProduct(null);
          clearProductDetail();
        }}
      >
        {productError ? <ErrorBanner message={productError} /> : null}
        {productLoading ? (
          <div className="text-sm text-white/60">Loading details...</div>
        ) : detail ? (
          <div className="space-y-6 text-sm text-white/70">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
              <div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {detailImage ? (
                    <img
                      src={detailImage}
                      alt={detail.name}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center text-sm text-white/40">
                      No product image
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`thumb-${index}`}
                      className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
                    >
                      {detailImage ? (
                        <img
                          src={detailImage}
                          alt={`${detail.name} thumbnail ${index + 1}`}
                          className="h-16 w-full object-cover"
                        />
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
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <Icon name="pencil" className="h-4 w-4" />
                    Edit
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

            <Section title="Logistics">
              <div className="space-y-2 text-sm text-white/60">
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
              </div>
            </Section>

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
          </div>
        ) : null}
      </SlideOver>
    </div>
  );
}
