import { useEffect, useMemo, useState } from "react";
import Icon from "../../template/Icon";
import DataTableCard from "../../tables/data/DataTableCard";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SlideOver from "../../template/SlideOver";
import { useProducts } from "../../../context/ProductsContext";
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

export default function ProductsPage() {
  const { products, isLoading, errorMessage, loadProducts } = useProducts();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        onClose={() => setIsDetailOpen(false)}
      >
        {selectedProduct ? (
          <div className="space-y-6 text-sm text-white/70">
            <div className="flex items-center gap-4">
              {selectedProduct.imageSrc ? (
                <img
                  src={selectedProduct.imageSrc}
                  alt={selectedProduct.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-base font-semibold text-white">
                  {selectedProduct.initials || "--"}
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-white">
                  {selectedProduct.name}
                </p>
                <p className="text-white/50">SKU: {selectedProduct.sku}</p>
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase text-white/40">Price</p>
                <p className="text-sm font-semibold text-white">
                  {selectedProduct.price}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Stock</p>
                <p className="text-sm font-semibold text-white">
                  {selectedProduct.stock}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Status</p>
                <span
                  className={[
                    "mt-1 inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
                    statusStyles[selectedProduct.availabilityKey] ||
                      "bg-white/10 text-white/60",
                  ].join(" ")}
                >
                  {selectedProduct.availabilityLabel}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Category</p>
                <p className="text-sm font-semibold text-white">
                  {selectedProduct.category}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Brand</p>
                <p className="text-sm font-semibold text-white">
                  {selectedProduct.brand}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-white/40">Description</p>
              <p className="mt-2 text-white/70">
                {selectedProduct.description || "-"}
              </p>
            </div>
          </div>
        ) : null}
      </SlideOver>
    </div>
  );
}
