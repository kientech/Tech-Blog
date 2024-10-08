import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Client/Navbar";
import WebPage from "./pages/CommonCategoryPage";
import AppPage from "./pages/AppPage";
import Footer from "./components/Client/Footer";
import LoginPage from "./pages/Authentication/LoginPage";
import RecoverPassword from "./pages/Authentication/RecoverPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import RegisterPage from "./pages/Authentication/RegisterPage";
import Profile from "./pages/Profile";
import CreateBlogPage from "./pages/Manage Blog/CreateBlogPage";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import ManageBlogsPage from "./pages/Manage Blog/ManageBlogsPage";
import EditBlogPage from "./pages/Manage Blog/EditBlogPage";
import DashboardStatistic from "./pages/Dashboard/DashboardStatistic";
import DetailBlogPage from "./pages/DetailBlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryBlogPage from "./components/Client/Category Page/CategoryBlogPage";
import CommonCategoryPage from "./pages/CommonCategoryPage";
import LikedBlogPage from "./pages/Manage Blog/LikedBlogPage";

function App() {
  const location = useLocation();

  // Determine if the current route is a login-related page
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/recover-password" ||
    location.pathname.includes("/reset-password/");

  return (
    <div className="w-[90%] mx-auto">
      {!isLoginPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog/:slug" element={<DetailBlogPage />} />
        <Route path="/category/:category" element={<CommonCategoryPage />} />
        <Route path="/app" element={<AppPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardStatistic />} />
          <Route path="create-blog" element={<CreateBlogPage />} />
          <Route path="manage-blogs" element={<ManageBlogsPage />} />
          <Route path="liked-blogs" element={<LikedBlogPage />} />
          <Route path="edit-blog/:id" element={<EditBlogPage />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
