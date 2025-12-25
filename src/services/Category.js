import api from "./Api"

export const fetchCategory = async () => {
    const res = await api.get("/category")

    return res.data
}