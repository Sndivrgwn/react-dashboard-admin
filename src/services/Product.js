import api from "./Api";

export const createProduct = async (payload) => {
  const res = await api.post("/product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const fetchProducts = async ({ page } = {}) => {
  const res = await api.get("/product", {
    params: page ? { page } : undefined,
  });
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

export const updateProduct = async (id, payload) => {
  const hasFile = Object.values(payload || {}).some(
    (value) => value instanceof File || value instanceof Blob
  );
  if (!hasFile) {
    const res = await api.patch(`/product/${id}`, payload);
    return res.data;
  }

  const formData = new FormData();
  formData.append("_method", "PATCH");
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    formData.append(key, value);
  });

  const res = await api.post(`/product/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
