import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { fetchProducts } from "../services/Product";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProducts = useCallback(async ({ force = false } = {}) => {
    if (!force && products.length) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await fetchProducts();
      const items = Array.isArray(data)
        ? data
        : data?.product || data?.data || data?.products || [];
      setProducts(items);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to load products."
      );
    } finally {
      setIsLoading(false);
    }
  }, [products.length]);

  const value = useMemo(
    () => ({
      products,
      isLoading,
      errorMessage,
      setProducts,
      loadProducts,
    }),
    [products, isLoading, errorMessage, loadProducts]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
}
