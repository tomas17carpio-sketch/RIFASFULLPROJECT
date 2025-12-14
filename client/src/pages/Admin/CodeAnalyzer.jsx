// /client/src/pages/admin/CodeAnalyzer.jsx
import React, { useState } from "react";

export default function CodeAnalyzer() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!code.trim()) return alert("Debes ingresar código.");

    setLoading(true);

    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken"), // Seguridad
      },
      body: JSON.stringify({ code, mode: "analizar" }), // Compatibilidad con backend
    });

    const data = await res.json();
    setLoading(false);

    setResult(data.result || "⚠ No se recibió ninguna respuesta del servidor.");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">🔍 Analizador de Código</h2>

      <textarea
        className="w-full h-48 p-3 bg-gray-800 border border-gray-700 rounded text-white"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Pega tu código aquí…"
      />

      <button
        onClick={analyze}
        className="mt-4 px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Analizando…" : "Analizar"}
      </button>

      {result && (
        <pre className="mt-6 p-4 bg-black/40 border border-gray-700 rounded text-green-300 whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
}
