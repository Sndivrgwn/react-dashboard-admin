import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { fetchProducts } from "../services/Product";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [lastLoadedPage, setLastLoadedPage] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 5,
    total: 0,
    from: 0,
    to: 0,
    links: [],
    nextPageUrl: null,
    prevPageUrl: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProducts = useCallback(async ({ page = 1, force = false } = {}) => {
    if (!force && page === lastLoadedPage) return;
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await fetchProducts({ page });
      const pageData = data?.product || data?.data || data?.products || data;
      const items = Array.isArray(pageData) ? pageData : pageData?.data || [];
      setProducts(items);
      if (pageData && !Array.isArray(pageData)) {
        setPagination({
          currentPage: pageData.current_page || page,
          lastPage: pageData.last_page || 1,
          perPage: pageData.per_page || items.length || 0,
          total: pageData.total || items.length || 0,
          from: pageData.from || 0,
          to: pageData.to || items.length || 0,
          links: pageData.links || [],
          nextPageUrl: pageData.next_page_url || null,
          prevPageUrl: pageData.prev_page_url || null,
        });
      }
      setLastLoadedPage(page);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to load products."
      );
    } finally {
      setIsLoading(false);
    }
  }, [lastLoadedPage]);

  const value = useMemo(
    () => ({
      products,
      lastLoadedPage,
      pagination,
      isLoading,
      errorMessage,
      setProducts,
      loadProducts,
    }),
    [products, lastLoadedPage, pagination, isLoading, errorMessage, loadProducts]
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
