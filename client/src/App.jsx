import React, { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import ComponenteIA from "./components/ComponenteIA"; // componente generado por IA

function App() {
  const [wsMessage, setWsMessage] = useState("");

  // Conexión WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    ws.onopen = () => {
      console.log("🔗 Conectado al WebSocket");
    };

    ws.onmessage = (event) => {
      console.log("📩 Mensaje recibido:", event.data);
      setWsMessage(event.data);
    };

    ws.onerror = (err) => {
      console.error("❌ Error WebSocket:", err);
    };

    ws.onclose = () => {
      console.log("🔒 WebSocket cerrado");
    };

    // Limpiar la conexión al desmontar
    return () => ws.close();
  }, []);

  // Función para manejar el submit de TicketForm
  const handleTicketSubmit = async (formData) => {
    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar los datos a tu backend usando axios o fetch
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compra tus tickets</h1>
      <TicketForm onSubmit={handleTicketSubmit} />

      <div className="mt-4 p-2 bg-gray-100 rounded">
        <strong>Mensaje WebSocket:</strong> {wsMessage}
      </div>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Diseño generado por IA</h2>
      <ComponenteIA />
    </div>
  );
}

export default App;
