import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductDescriptionSection from "./sections/ProductDescriptionSection";
import PricingAvailabilitySection from "./sections/PricingAvailabilitySection";
import ProductImagesCard from "./sections/ProductImagesCard";
import PublishingCard from "./sections/PublishingCard";
import ScheduleModal from "./sections/ScheduleModal";
import colorData from "../../../dataset/color/color.json";
import ErrorBanner from "../../error/banner/ErrorBanner";
import SuccessBanner from "../../error/banner/SuccessBanner";
import LoadingOverlay from "../../template/LoadingOverlay";
import { ProductProvider, useProductForm } from "../../../context/ProductContext";
import { useCatalog } from "../../../context/CatalogContext";

const colors = colorData;
const availabilityOptions = [
  { label: "In stock", value: "in_stock" },
  { label: "Out of stock", value: "out_of_stock" },
  { label: "Preorder", value: "preorder" },
];

function AddProductContent() {
  const { brands, categories, loadCatalog } = useCatalog();
  const colorOptions = useMemo(
    () => colors.map((item) => ({ label: item.name, value: item.hex })),
    []
  );
  const {
    errorMessage,
    successMessage,
    isScheduleOpen,
    setIsScheduleOpen,
    isSubmitting,
  } = useProductForm();
  const navigate = useNavigate();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  useEffect(() => {
    if (!successMessage) return;
    const timeoutId = setTimeout(() => {
      navigate("/ecommerce/products");
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, [successMessage, navigate]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 text-white">
      {isSubmitting ? <LoadingOverlay message="Saving product..." /> : null}
      {errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      {successMessage ? <SuccessBanner message={successMessage} /> : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white/50">E-commerce</p>
          <h1 className="text-2xl font-semibold">Add Products</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span>Home</span>
          <span>/</span>
          <span className="text-white/80">Add Products</span>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[2.1fr_1fr]">
          <section className="space-y-6">
            <ProductDescriptionSection
              categories={categories}
              brands={brands}
              colorOptions={colorOptions}
            />
            <PricingAvailabilitySection
              availabilityOptions={availabilityOptions}
            />
          </section>

          <aside className="space-y-6">
            <ProductImagesCard />
            <PublishingCard onOpenSchedule={() => setIsScheduleOpen(true)} />
          </aside>
        </div>
      </form>
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
    </div>
  );
}

export default function AddProductPage() {
  return (
    <ProductProvider>
      <AddProductContent />
    </ProductProvider>
  );
}
