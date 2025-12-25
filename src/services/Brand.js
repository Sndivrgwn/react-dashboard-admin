import api from "./Api"

export const fetchBrand = async () => {
    const res = await api.get('/brand');

    return res.data
}