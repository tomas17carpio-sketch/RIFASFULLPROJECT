import React, { useState } from "react";

export default function DashboardStatsIA() {
  const [analysis, setAnalysis] = useState("");

  const loadStats = async () => {
    const res = await fetch("/api/ai/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": localStorage.getItem("admin_token") },
    });
    const data = await res.json();
    setAnalysis(data.analysis);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold mb-2">Análisis IA de ventas</h3>
      <button onClick={loadStats} className="bg-purple-600 text-white px-3 py-2 rounded mb-2">Generar Análisis</button>
      <pre className="text-sm">{analysis}</pre>
    </div>
  );
}
