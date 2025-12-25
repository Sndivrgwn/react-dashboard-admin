import api from "./Api";

export const createProduct = async (payload) => {
  const res = await api.post("/product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const fetchProducts = async () => {
  const res = await api.get("/product");
  return res.data;
};
