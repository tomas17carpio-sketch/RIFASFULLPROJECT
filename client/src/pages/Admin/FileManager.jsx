// /client/src/pages/admin/FileManager.jsx
import React, { useState } from "react";

export default function FileManager() {
  const [filePath, setFilePath] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
    try {
      const res = await fetch("/api/ai/analyze-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken"),
        },
        body: JSON.stringify({ filePath }),
      });

      const data = await res.json();
      setResult(data.result || "⚠ No se pudo analizar el archivo.");
    } catch (error) {
      setResult("❌ Error en el análisis.");
    }
  };

  const save = async () => {
    try {
      const res = await fetch("/api/ai/save-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken"),
        },
        body: JSON.stringify({ filePath, content }),
      });

      const data = await res.json();
      alert(data.message || "Archivo guardado");
    } catch (error) {
      alert("❌ Error guardando el archivo");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">📁 Gestor / Analizador de Archivos</h2>

      {/* Input ruta */}
      <input
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded mb-3"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        placeholder="Ruta del archivo (ej: server/index.js)"
      />

      {/* Botón analizar */}
      <button
        onClick={analyze}
        className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
      >
        Analizar archivo
      </button>

      {/* Resultado */}
      {result && (
        <pre className="mt-6 p-4 bg-black/40 border border-gray-700 rounded whitespace-pre-wrap">
          {result}
        </pre>
      )}

      {/* Editor */}
      <h3 className="text-xl mt-6 mb-2">Editar archivo</h3>

      <textarea
        className="w-full h-48 bg-gray-800 border border-gray-700 rounded p-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido corregido aquí…"
      />

      {/* Guardar */}
      <button
        onClick={save}
        className="mt-4 px-6 py-3 bg-green-600 rounded hover:bg-green-700"
      >
        Guardar cambios
      </button>
    </div>
  );
}
