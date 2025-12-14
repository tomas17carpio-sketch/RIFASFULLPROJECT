// /client/src/pages/admin/AdminApp.jsx
import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";

export default function AdminApp() {
  // Se mantiene sincronizado con localStorage
  const [auth, setAuth] = useState(() => localStorage.getItem("adminToken"));

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setAuth(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAuth(null);
  };

  return auth ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
