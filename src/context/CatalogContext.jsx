import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { fetchBrand } from "../services/Brand";
import { fetchCategory } from "../services/Category";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadCatalog = useCallback(
    async ({ force = false } = {}) => {
      if (!force && brands.length && categories.length) return;
      setIsLoading(true);
      setErrorMessage("");
      try {
        const [brandRes, categoryRes] = await Promise.all([
          fetchBrand(),
          fetchCategory(),
        ]);
        const brandItems = brandRes?.brand || brandRes?.data || brandRes?.brands || [];
        const categoryItems =
          categoryRes?.category ||
          categoryRes?.data ||
          categoryRes?.categories ||
          [];
        setBrands(brandItems.map((item) => ({ label: item.name, value: item.id })));
        setCategories(
          categoryItems.map((item) => ({ label: item.name, value: item.id }))
        );
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message || "Unable to load catalog data."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [brands.length, categories.length]
  );

  const value = useMemo(
    () => ({
      brands,
      categories,
      isLoading,
      errorMessage,
      loadCatalog,
    }),
    [brands, categories, isLoading, errorMessage, loadCatalog]
  );

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }
  return context;
}
