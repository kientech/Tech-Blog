import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Client/Navbar";
import WebPage from "./pages/WebPage";
import AppPage from "./pages/AppPage";

function App() {
  return (
    <div className="w-[90%] mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/web" element={<WebPage></WebPage>} />
        <Route path="/app" element={<AppPage></AppPage>} />
      </Routes>
    </div>
  );
}

export default App;
