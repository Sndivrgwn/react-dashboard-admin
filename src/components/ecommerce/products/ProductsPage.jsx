import { useEffect, useMemo, useState } from "react";
import Icon from "../../template/Icon";
import DataTableCard from "../../tables/data/DataTableCard";
import ErrorBanner from "../../error/banner/ErrorBanner";
import { useProducts } from "../../../context/ProductsContext";
import AddButton from "../sections/AddButton";
import FilterButton from "../sections/FilterButton";
import ExportButton from "../sections/ExportButton";
import ProductDrawer from "./ProductDrawer";

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
  const { products, pagination, isLoading, errorMessage, loadProducts } =
    useProducts();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts({ page });
  }, [loadProducts, page]);

  const rows = useMemo(() => {
    const apiHost = "http://127.0.0.1:8000";
    return products.map((product) => {
      const availabilityKey = String(
        product.availability_status || product.status || ""
      )
        .replace(/_/g, " ")
        .toLowerCase();
      const rawImage =
        product.product_images?.[0]?.path ||
        product.product_images?.[0] ||
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
        category:
          product.category?.name ||
          product.category_name ||
          product.category ||
          "-",
        price: formatCurrency(product.price),
        stock: product.stock_quantity ?? product.stock ?? "-",
        availabilityKey,
        availabilityLabel:
          availabilityLabels[product.availability_status] ||
          availabilityLabels[product.status] ||
          product.availability_status ||
          product.status ||
          "-",
        imageSrc,
        initials,
        source: product,
      };
    });
  }, [products]);

  const pageNumbers = useMemo(() => {
    const linkPages =
      pagination.links
        ?.map((link) => Number(link.page))
        .filter((page) => Number.isFinite(page) && page > 0) || [];
    const uniquePages = Array.from(new Set(linkPages)).sort((a, b) => a - b);
    if (uniquePages.length) return uniquePages;
    const lastPage = pagination.lastPage || 1;
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }, [pagination.links, pagination.lastPage]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Products</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FilterButton />
          <ExportButton />
          <AddButton title="Add Product" to="/ecommerce/product/add" />
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
            <span>
              Showing {pagination.from || 0}-{pagination.to || 0} of{" "}
              {pagination.total || 0} results
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={!pagination.prevPageUrl || page <= 1}
                className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Previous
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition",
                    pageNumber === page
                      ? "bg-white text-slate-900"
                      : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, pagination.lastPage || prev + 1)
                  )
                }
                disabled={!pagination.nextPageUrl || page >= pagination.lastPage}
                className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
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
                            loading="lazy"
                            decoding="async"
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
                          setSelectedProduct(product.source);
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

      <ProductDrawer
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
