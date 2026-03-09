import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authLogin, authRegister, authMe } from "../services/api.js";

const TOKEN_KEY = "token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSession = useCallback((token, userData) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    setUser(userData);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: u } = await authLogin(email, password);
    setSession(token, u);
    return u;
  }, [setSession]);

  const register = useCallback(async (email, password, fullName) => {
    const { token, user: u } = await authRegister(email, password, fullName);
    setSession(token, u);
    return u;
  }, [setSession]);

  const logout = useCallback(() => {
    setSession(null, null);
  }, [setSession]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authMe()
      .then((u) => setUser(u))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
