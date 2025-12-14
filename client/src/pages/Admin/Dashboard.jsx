// /client/src/pages/admin/Dashboard.jsx
import React, { useState } from "react";
import CodeAnalyzer from "./CodeAnalyzer";
import CodeGenerator from "./CodeGenerator";
import FileManager from "./FileManager";

export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("analyzer");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">

      {/* ==============================
          SIDEBAR
      =============================== */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">⚙️ Panel Admin</h1>

        <ul className="space-y-3">
          <li
            onClick={() => setTab("analyzer")}
            className={`p-3 rounded-lg cursor-pointer transition ${
              tab === "analyzer" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            🔍 Analizar Código
          </li>

          <li
            onClick={() => setTab("generator")}
            className={`p-3 rounded-lg cursor-pointer transition ${
              tab === "generator" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            ⚡ Generar Código
          </li>

          <li
            onClick={() => setTab("files")}
            className={`p-3 rounded-lg cursor-pointer transition ${
              tab === "files" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            📁 Analizar Archivos
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-red-600 mt-10 p-3 rounded-lg hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* ==============================
          CONTENIDO PRINCIPAL
      =============================== */}
      <main className="flex-1 p-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl min-h-[70vh]">

          {tab === "analyzer" && <CodeAnalyzer />}
          {tab === "generator" && <CodeGenerator />}
          {tab === "files" && <FileManager />}

        </div>
      </main>
    </div>
  );
}
