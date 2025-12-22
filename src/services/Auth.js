import api from "./Api"

export const login = async (payload) => {
    const res = await api.post('/login', payload)
    return res.data
}

export const register = async (payload) => {
    const res = await api.post('/register', payload)
    return res.data
}

export const logout = async () => {
    await api.post('/logout')
    localStorage.clear()
}

export const getMe = async () => {
    const res = await api.get('/user');
    return res.data
}
