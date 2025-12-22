import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/Auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuth = !!user;

  const login = async (data) => {
    const res = await authService.login(data);

    localStorage.setItem("token", res.token);
    setUser(res.user);
    return res;
  };

  const register = async (data) => {
    const res = await authService.register(data);

    if (res?.token) {
      localStorage.setItem("token", res.token);
    }
    if (res?.user) {
      setUser(res.user);
    }

    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const res = await authService.getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
