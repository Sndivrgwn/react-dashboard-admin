import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createBrand, fetchBrand } from "../services/Brand";
import { createCategory, fetchCategory } from "../services/Category";

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

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
        const brandItems =
          brandRes?.brand || brandRes?.data || brandRes?.brands || [];
        const categoryItems =
          categoryRes?.category ||
          categoryRes?.data ||
          categoryRes?.categories ||
          [];
        setBrands(
          brandItems.map((item) => ({ label: item.name, value: item.id }))
        );
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

  const clearSaveState = useCallback(() => {
    setSaveMessage("");
    setSaveError("");
  }, []);

  const addBrand = useCallback(
    async (payload) => {
      setIsSaving(true);
      setSaveMessage("");
      setSaveError("");
      try {
        const data = await createBrand(payload);
        await loadCatalog({ force: true });
        setSaveMessage(data?.message || "Brand created.");
        return data;
      } catch (error) {
        const message =
          error?.response?.data?.message || "Unable to create brand.";
        setSaveError(message);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadCatalog]
  );

  const addCategory = useCallback(
    async (payload) => {
      setIsSaving(true);
      setSaveMessage("");
      setSaveError("");
      try {
        const data = await createCategory(payload);
        await loadCatalog({ force: true });
        setSaveMessage(data?.message || "Category created.");
        return data;
      } catch (error) {
        const message =
          error?.response?.data?.message || "Unable to create category.";
        setSaveError(message);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadCatalog]
  );

  const value = useMemo(
    () => ({
      brands,
      categories,
      isLoading,
      errorMessage,
      isSaving,
      saveMessage,
      saveError,
      loadCatalog,
      addBrand,
      addCategory,
      clearSaveState,
    }),
    [
      brands,
      categories,
      isLoading,
      errorMessage,
      isSaving,
      saveMessage,
      saveError,
      loadCatalog,
      addBrand,
      addCategory,
      clearSaveState,
    ]
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
