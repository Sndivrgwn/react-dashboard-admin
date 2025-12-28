import { create } from "zustand";
import { fetchProductById } from "../services/Product";
import { fetchBrandById } from "../services/Brand";
import { fetchCategoryById } from "../services/Category";

const extractDetail = (data, key) =>
  data?.[key] || data?.data || data?.result || data?.item || null;

export const useDetailStore = create((set) => ({
  productDetail: null,
  productLoading: false,
  productError: "",
  brandDetail: null,
  brandLoading: false,
  brandError: "",
  categoryDetail: null,
  categoryLoading: false,
  categoryError: "",

  fetchProductDetail: async (id) => {
    if (!id) return;
    set({ productLoading: true, productError: "" });
    try {
      const data = await fetchProductById(id);
      set({
        productDetail: extractDetail(data, "product"),
      });
    } catch (error) {
      set({
        productError:
          error?.response?.data?.message || "Unable to load product detail.",
      });
    } finally {
      set({ productLoading: false });
    }
  },
  clearProductDetail: () =>
    set({ productDetail: null, productError: "" }),

  fetchBrandDetail: async (id) => {
    if (!id) return;
    set({ brandLoading: true, brandError: "" });
    try {
      const data = await fetchBrandById(id);
      set({
        brandDetail: extractDetail(data, "brand"),
      });
    } catch (error) {
      set({
        brandError:
          error?.response?.data?.message || "Unable to load brand detail.",
      });
    } finally {
      set({ brandLoading: false });
    }
  },
  clearBrandDetail: () => set({ brandDetail: null, brandError: "" }),

  fetchCategoryDetail: async (id) => {
    if (!id) return;
    set({ categoryLoading: true, categoryError: "" });
    try {
      const data = await fetchCategoryById(id);
      set({
        categoryDetail: extractDetail(data, "category"),
      });
    } catch (error) {
      set({
        categoryError:
          error?.response?.data?.message || "Unable to load category detail.",
      });
    } finally {
      set({ categoryLoading: false });
    }
  },
  clearCategoryDetail: () =>
    set({ categoryDetail: null, categoryError: "" }),
}));
