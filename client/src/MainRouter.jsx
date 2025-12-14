// /client/src/MainRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHome from "./App"; 
import AdminApp from "./pages/admin/AdminApp";

export default function MainRouter() {
  return (
    <Router>
      <Routes>

        {/* RUTA PRINCIPAL (PÚBLICA) */}
        <Route path="/" element={<AppHome />} />

        {/* PANEL ADMIN */}
        <Route path="/admin/*" element={<AdminApp />} />

      </Routes>
    </Router>
  );
}
