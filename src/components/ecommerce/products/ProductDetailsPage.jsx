import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../../template/Icon";
import Badge from "../../template/Badge";
import ErrorBanner from "../../error/banner/ErrorBanner";
import ImageLightbox from "../../template/ImageLightbox";
import { useDetailStore } from "../../../store/detailStore";
import { toTitle } from "../../../utils/productForm";

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

function Section({ title, children }) {
  return (
    <section className="border-b border-white/10 pb-6">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
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

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showDescription, setShowDescription] = useState(false);
  const [copiedSku, setCopiedSku] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const productDetail = useDetailStore((state) => state.productDetail);
  const productLoading = useDetailStore((state) => state.productLoading);
  const productError = useDetailStore((state) => state.productError);
  const fetchProductDetail = useDetailStore((state) => state.fetchProductDetail);
  const clearProductDetail = useDetailStore((state) => state.clearProductDetail);

  useEffect(() => {
    fetchProductDetail(id);
    return () => clearProductDetail();
  }, [fetchProductDetail, clearProductDetail, id]);

  useEffect(() => {
    setShowDescription(false);
    setCopiedSku(false);
  }, [productDetail?.id]);

  const product = useMemo(() => {
    if (!productDetail) return null;
    const detailImages = (productDetail.product_images || [])
      .map((image) =>
        resolveImage(typeof image === "string" ? image : image?.path)
      )
      .filter(Boolean);
    const lengthValue = productDetail.length_cm ?? productDetail.lengthCm;
    const widthValue = productDetail.width_cm ?? productDetail.widthCm;
    const heightValue = productDetail.height_cm ?? productDetail.heightCm;
    return {
      id: productDetail.id,
      name: productDetail.name,
      sku: productDetail.SKU || productDetail.sku,
      status: productDetail.status || "draft",
      stockQuantity: productDetail.stock_quantity ?? productDetail.stockQuantity,
      price: productDetail.price,
      currency: productDetail.currency || "USD",
      channel: productDetail.channel,
      visibility: productDetail.visibility,
      category: productDetail.category?.name || productDetail.category_name,
      brand: productDetail.brand?.name || productDetail.brand_name,
      images:
        detailImages.length > 0
          ? detailImages
          : [resolveImage(productDetail.image)].filter(Boolean),
      description: productDetail.description,
      weightKg: productDetail.weight_kg ?? productDetail.weightKg,
      lengthCm: lengthValue,
      widthCm: widthValue,
      heightCm: heightValue,
      createdAt: productDetail.created_at ?? productDetail.createdAt,
      updatedAt: productDetail.updated_at ?? productDetail.updatedAt,
      scheduledAt: productDetail.scheduled_at ?? productDetail.scheduledAt,
    };
  }, [productDetail]);

  useEffect(() => {
    setActiveImage(product?.images?.[0] || "");
  }, [product?.images]);

  const stockQuantity = Number(product?.stockQuantity ?? 0);
  const stockVariant =
    stockQuantity <= 0
      ? "out_of_stock"
      : stockQuantity <= 5
        ? "low_stock"
        : "in_stock";
  const stockLabel =
    stockVariant === "out_of_stock"
      ? "Out of stock"
      : stockVariant === "low_stock"
        ? "Low stock"
        : "In stock";

  const statusVariant = (product?.status || "draft").toLowerCase();
  const statusLabel = toTitle(product?.status || "draft");
  const dimensionsValue =
    product?.lengthCm || product?.widthCm
      ? product?.heightCm
        ? `${product?.lengthCm || "-"} × ${product?.widthCm || "-"} × ${product?.heightCm || "-"}`
        : `${product?.lengthCm || "-"} × ${product?.widthCm || "-"}`
      : "-";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "inventory", label: "Inventory" },
    { id: "media", label: "Media" },
    { id: "pricing", label: "Pricing" },
    { id: "activity", label: "Activity" },
  ];

  const handleCopySku = async () => {
    if (!product?.sku) return;
    try {
      await navigator.clipboard.writeText(product.sku);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = product.sku;
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

  if (productLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
        <div className="text-sm text-white/60">Loading product...</div>
      </div>
    );
  }

  if (!product && productError) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
        <ErrorBanner message={productError} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
        <div className="text-sm text-white/60">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      <div className="border-b border-white/10 py-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="text-sm text-white/50">
              <Link to="/ecommerce/products" className="hover:text-white">
                Products
              </Link>{" "}
              / {product.name}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <Badge label={statusLabel} variant={statusVariant} />
              <Badge label={stockLabel} variant={stockVariant} />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              <span>SKU: {product.sku || "-"}</span>
              <button
                type="button"
                onClick={handleCopySku}
                disabled={!product.sku}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Copy SKU"
              >
                <Icon name="clipboard" className="h-3.5 w-3.5" />
                Copy
              </button>
              {copiedSku ? (
                <span className="text-xs text-emerald-300">Copied</span>
              ) : null}
              <span className="text-white/40">·</span>
              <span>{product.category || "-"}</span>
              <span className="text-white/40">·</span>
              <span>{product.brand || "-"}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/ecommerce/products/${id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Icon name="pencil" className="h-4 w-4" />
              Edit
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              View in store
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Duplicate
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {product.status === "archived" ? "Unarchive" : "Archive"}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="More actions"
            >
              <Icon name="dots" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {product.images.length ? (
              <button
                type="button"
                onClick={() => {
                  setActiveImage(product.images[0]);
                  setIsImageOpen(true);
                }}
                className="group relative h-72 w-full overflow-hidden"
                aria-label="View full image"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
              </button>
            ) : (
              <div className="flex h-72 items-center justify-center text-sm text-white/40">
                No product image
              </div>
            )}
          </div>
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" ? (
            <div className="space-y-6">
              <Section title="Description">
                {product.description ? (
                  <>
                    <p
                      className={[
                        "text-sm text-white/70",
                        showDescription ? "" : "max-h-16 overflow-hidden",
                      ].join(" ")}
                    >
                      {product.description}
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

              <Section title="Key attributes">
                <div className="grid gap-3 text-sm text-white/60 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Channel</span>
                    <Badge label={toTitle(product.channel)} variant={product.channel} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Visibility</span>
                    <Badge label={toTitle(product.visibility)} variant={product.visibility} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:col-span-2">
                    <span>Tags</span>
                    <span className="text-white/40">No tags</span>
                  </div>
                </div>
              </Section>

              <Section title="Logistics & specs">
                <div className="grid gap-3 text-sm text-white/60 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Weight</span>
                    <span className="text-white">
                      {product.weightKg ?? "-"} kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Dimensions</span>
                    <span className="text-white">
                      {dimensionsValue === "-"
                        ? "-"
                        : `${dimensionsValue} cm`}
                    </span>
                  </div>
                </div>
              </Section>
            </div>
          ) : activeTab === "media" ? (
            <Section title="Media">
              {product.images.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {product.images.slice(0, 5).map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => {
                        setActiveImage(image);
                        setIsImageOpen(true);
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                      aria-label={`View product image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-40 w-full object-cover transition duration-200 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/50">No images uploaded.</p>
              )}
            </Section>
          ) : (
            <Section title="Coming soon">
              <p className="text-sm text-white/50">
                This section is ready for future product data.
              </p>
            </Section>
          )}
        </div>

        <aside className="space-y-4">
          <StatCard
            label="Price"
            value={formatCurrency(product.price, product.currency)}
          />
          <StatCard
            label="Stock quantity"
            value={product.stockQuantity ?? "-"}
          />
          <StatCard
            label="Visibility"
            value={toTitle(product.visibility)}
            badge={{
              label: toTitle(product.visibility),
              variant: product.visibility,
            }}
          />
          <StatCard
            label="Channel"
            value={toTitle(product.channel)}
            badge={{
              label: toTitle(product.channel),
              variant: product.channel,
            }}
          />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Logistics</h4>
            <div className="mt-3 space-y-2 text-sm text-white/60">
              <div className="flex items-center justify-between">
                <span>Weight</span>
                <span className="text-white">{product.weightKg ?? "-"} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dimensions</span>
                <span className="text-white">
                  {dimensionsValue === "-"
                    ? "-"
                    : `${dimensionsValue} cm`}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
            <h4 className="text-sm font-semibold text-white">Metadata</h4>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span>Created at</span>
                <span className="font-mono text-white/70">
                  {formatDateTime(product.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Updated at</span>
                <span className="font-mono text-white/70">
                  {formatDateTime(product.updatedAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Scheduled at</span>
                <span className="font-mono text-white/70">
                  {product.scheduledAt
                    ? formatDateTime(product.scheduledAt)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <ImageLightbox
        isOpen={isImageOpen}
        src={activeImage || product.images[0]}
        alt={product.name}
        onClose={() => setIsImageOpen(false)}
      />
    </div>
  );
}
