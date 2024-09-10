import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  // Hàm đăng nhập
  login: (userData, token) => {
    set({ user: userData, token });
    Cookies.set("token", token, { expires: 1, path: "/" }); // Lưu token vào cookie với thời hạn 1 ngày
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage
    localStorage.setItem("token", token); // Lưu token vào localStorage
  },

  // Hàm đăng xuất
  logout: () => {
    set({ user: null, token: null });
    Cookies.remove("token", { path: "/" }); // Xóa token từ cookie
    localStorage.removeItem("user"); // Xóa thông tin người dùng từ localStorage
    localStorage.removeItem("token"); // Xóa token từ localStorage
  },

  // Tải thông tin người dùng từ localStorage
  loadUserFromLocalStorage: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get("token");
    if (user && token) {
      set({ user, token });
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData)); // Cập nhật thông tin người dùng trong localStorage
  },
}));
