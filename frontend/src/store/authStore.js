import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (userData, token) => {
    set({ user: userData, token });
    Cookies.set("token", token, { expires: 1, path: "/" });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ user: null, token: null });
    Cookies.remove("token", { path: "/" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  loadUserFromLocalStorage: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get("token");
    if (user && token) {
      set({ user, token });
    }
  },
}));
