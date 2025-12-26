import api from "./Api"

export const fetchCategory = async () => {
    const res = await api.get("/category")

    return res.data
}

export const createCategory = async (payload) => {
    const res = await api.post("/category", payload)

    return res.data
}
