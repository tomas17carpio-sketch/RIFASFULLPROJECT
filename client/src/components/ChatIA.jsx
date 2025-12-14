import React, { useState } from "react";

export default function ChatIA() {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!q) return;
    const entry = { role: "user", text: q };
    setMessages([...messages, entry]);
    setQ("");
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": localStorage.getItem("admin_token") || "" },
      body: JSON.stringify({ question: entry.text }),
    });
    const data = await res.json();
    setMessages((m) => [...m, { role: "ai", text: data.answer }]);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-lg">
      <div className="p-3 h-56 overflow-auto">
        {messages.map((ms, i) => (
          <div key={i} className={`mb-2 ${ms.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded ${ms.role === "user" ? "bg-purple-100" : "bg-gray-100"}`}>{ms.text}</div>
          </div>
        ))}
      </div>
      <div className="p-3 flex gap-2">
        <input value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Pregunta a la IA..." />
        <button onClick={send} className="bg-purple-600 text-white px-3 rounded">Enviar</button>
      </div>
    </div>
  );
}
