import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Client/Navbar";
import WebPage from "./pages/WebPage";
import AppPage from "./pages/AppPage";
import Footer from "./components/Client/Footer";
import LoginPage from "./pages/Authentication/LoginPage";
import RecoverPassword from "./pages/Authentication/RecoverPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import RegisterPage from "./pages/Authentication/RegisterPage";

function App() {
  const location = useLocation();

  // Determine if the current route is '/login'
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/recover-password" ||
    location.pathname.includes("/reset-password/");

  return (
    <div className="w-[90%] mx-auto">
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/admin" element={role === 'admin' ? <AdminDashboard /> : <HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/web" element={<WebPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
