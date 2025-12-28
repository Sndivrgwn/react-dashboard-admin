import api from "./Api"

export const fetchBrand = async () => {
    const res = await api.get('/brand');

    return res.data;
}

export const createBrand = async (payload) => {
    const res = await api.post('/brand', payload);

    return res.data;
}

export const fetchBrandById = async (id) => {
    const res = await api.get(`/brand/${id}`);

    return res.data;
}
