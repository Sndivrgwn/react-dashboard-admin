import { useEffect, useMemo, useState } from "react";
import Icon from "../../template/Icon";
import ErrorBanner from "../../error/banner/ErrorBanner";
import { useCatalog } from "../../../context/CatalogContext";
import DataTableCard from "../../tables/data/DataTableCard";
import AddButton from "../sections/AddButton";
import SlideOver from "../../template/SlideOver";

export default function BrandsPage() {
  const { brands, isLoading, errorMessage, loadCatalog } = useCatalog();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    setCurrentPage(1);
  }, [brands.length]);

  const totalPages = Math.max(1, Math.ceil(brands.length / pageSize));
  const pageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return brands.slice(startIndex, startIndex + pageSize);
  }, [brands, currentPage]);
  const startItem = brands.length ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, brands.length);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Brands</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AddButton title="Add Brand" to="/ecommerce/brands/add" />
        </div>
      </div>

      <DataTableCard
        title="Brand list"
        description="Manage available product brands."
        toolbar={
          <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">
            <Icon name="search" className="h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search brands..."
              className="w-full bg-transparent text-white/80 outline-none placeholder:text-white/40"
            />
          </div>
        }
        footer={
          <>
            <span>
              {brands.length
                ? `Showing ${startItem}-${endItem} of ${brands.length} results`
                : "No results"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition enabled:hover:border-white/20 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={
                      pageNumber === currentPage
                        ? "flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-900"
                        : "px-2 text-white/60"
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition enabled:hover:border-white/20 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                <th className="px-6 py-4 font-medium">Brand</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-white/60"
                  >
                    Loading brands...
                  </td>
                </tr>
              ) : pageItems.length ? (
                pageItems.map((brand) => (
                  <tr key={brand.value} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold text-white">
                      {brand.label}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setIsDetailOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-white/20 hover:text-white"
                        aria-label="View brand"
                      >
                        <Icon name="eye" className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="px-6 py-8 text-center text-white/60"
                  >
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DataTableCard>
      <SlideOver
        isOpen={isDetailOpen}
        title="Brand details"
        onClose={() => setIsDetailOpen(false)}
      >
        {selectedBrand ? (
          <div className="space-y-4 text-sm text-white/70">
            <div>
              <p className="text-xs uppercase text-white/40">Name</p>
              <p className="text-base font-semibold text-white">
                {selectedBrand.label}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-white/40">ID</p>
              <p className="text-sm text-white/80">{selectedBrand.value}</p>
            </div>
          </div>
        ) : null}
      </SlideOver>
    </div>
  );
}
