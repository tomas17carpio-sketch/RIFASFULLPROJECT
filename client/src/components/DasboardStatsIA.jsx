import React, { useState } from "react";

export default function DesignAI() {
  const [filePath, setFilePath] = useState("/pages/Home.jsx"); // ejemplo
  const [instruction, setInstruction] = useState("");
  const [mode, setMode] = useState("safe");
  const [preview, setPreview] = useState(null);

  const run = async () => {
    const res = await fetch("/api/ai/update-file", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": localStorage.getItem("admin_token") },
      body: JSON.stringify({ filePath, instruction, mode }),
    });
    const data = await res.json();
    if (data.newContent) setPreview(data.newContent);
    alert(JSON.stringify(data.status || data));
  };

  const applyPreview = async () => {
    // endpoint para forzar la escritura (solo admins)
    const res = await fetch("/api/ai/update-file", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": localStorage.getItem("admin_token") },
      body: JSON.stringify({ filePath, instruction: "APPLY_PREVIEW", mode: "auto" }),
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold mb-2">Diseñador IA</h3>
      <input value={filePath} onChange={e=>setFilePath(e.target.value)} className="mb-2 w-full p-2 border" />
      <select value={mode} onChange={e=>setMode(e.target.value)} className="mb-2 p-2 border">
        <option value="safe">Modo Seguro (preview)</option>
        <option value="mixed">Modo Mixto</option>
        <option value="auto">Modo Automático (sobrescribe)</option>
      </select>
      <textarea value={instruction} onChange={e=>setInstruction(e.target.value)} rows={4} className="w-full p-2 border mb-2" placeholder="Instrucción de diseño (ej: haz estilo Apple, colores azules)"></textarea>
      <div className="flex gap-2">
        <button onClick={run} className="bg-indigo-600 text-white px-3 py-2 rounded">Generar</button>
        {preview && <button onClick={applyPreview} className="bg-green-600 text-white px-3 py-2 rounded">Aplicar Preview</button>}
      </div>
      {preview && <pre className="mt-3 max-h-64 overflow-auto text-xs bg-gray-100 p-2 rounded">{preview}</pre>}
    </div>
  );
}
