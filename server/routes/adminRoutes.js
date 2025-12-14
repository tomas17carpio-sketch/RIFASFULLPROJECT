// Ruta: client/src/pages/Admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/payments-pending"
          className="p-6 bg-white rounded-lg shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">Pagos Pendientes</h2>
          <p>Revisar y aprobar/rechazar pagos recibidos</p>
        </Link>
        <Link
          to="/admin/raffles-crud"
          className="p-6 bg-white rounded-lg shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">Rifas</h2>
          <p>Crear, editar o eliminar rifas</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
