import { create } from "zustand";
import api from "../services/api"; // ✅ customized axios instance

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      set({ user: res.data.user, token: res.data.token });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  },

  register: async (name, email, password) => {
    try {
      await api.post("/auth/register", { name, email, password });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Register failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  fetchUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null });
    }
  },
}));

export default useAuthStore;
