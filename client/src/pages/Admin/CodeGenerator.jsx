// /client/src/pages/admin/CodeGenerator.jsx
import React, { useState } from "react";

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return alert("Debes ingresar instrucciones.");

    setLoading(true);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken"),
        },
        body: JSON.stringify({ instructions: prompt, language: "JS" }),
      });

      const data = await res.json();
      setResult(data.result || "⚠ No se recibió respuesta de la IA.");

    } catch (err) {
      setResult("❌ Error generando código");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">⚡ Generador de Código</h2>

      <textarea
        className="w-full h-48 p-3 bg-gray-800 border border-gray-700 rounded text-white"
        placeholder="Describe lo que quieres generar…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generate}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Generando…" : "Generar"}
      </button>

      {result && (
        <pre className="mt-6 p-4 bg-black/40 border border-gray-700 rounded whitespace-pre-wrap text-green-300">
          {result}
        </pre>
      )}
    </div>
  );
}
