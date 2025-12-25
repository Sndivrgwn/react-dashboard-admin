import api from "./Api";

export const fetchPosts = async () => {
  const res = await api.get("/product");
  return res.data;
};
