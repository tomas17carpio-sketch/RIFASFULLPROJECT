import { useState } from "react";
import { sendCodeToAI, generateCodeAI, analyzeFileAI, saveFileAI } from "../services/apiClient";

export default function AdminAI() {
  const [code, setCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [filePath, setFilePath] = useState("");
  const [result, setResult] = useState("");

  const analyzeCode = async () => {
    const res = await sendCodeToAI(code, "analizar");
    setResult(res.result || "No se pudo procesar");
  };

  const generateCode = async () => {
    const res = await generateCodeAI(instructions, "JS");
    setResult(res.result || "No se pudo generar código");
  };

  const analyzeFile = async () => {
    const res = await analyzeFileAI(filePath);
    setResult(res.result || "No se pudo analizar archivo");
  };

  const saveFile = async () => {
    const res = await saveFileAI(filePath, code);
    setResult(res.message || "No se pudo guardar archivo");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Administrativo IA</h1>

      <h3>Analizar / Guardar Código</h3>
      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Código..."
        style={{ width: "100%", height: 120 }}
      />
      <button onClick={analyzeCode}>Analizar Código</button>
      <button onClick={saveFile}>Guardar Código en Archivo</button>

      <h3>Generar Código desde Instrucciones</h3>
      <textarea
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        placeholder="Instrucciones para generar código..."
        style={{ width: "100%", height: 80, marginTop: 10 }}
      />
      <button onClick={generateCode}>Generar Código</button>

      <h3>Analizar Archivo Existente</h3>
      <input
        value={filePath}
        onChange={e => setFilePath(e.target.value)}
        placeholder="Ruta archivo (server/...)"
        style={{ width: "100%", marginTop: 10 }}
      />
      <button onClick={analyzeFile}>Analizar Archivo</button>

      <pre style={{ background: "#111", color: "#0f0", padding: 20, marginTop: 10, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </div>
  );
}
