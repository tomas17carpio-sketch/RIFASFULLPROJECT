let socket = null;

export function connectWebSocket() {
  if (socket) return socket;

  socket = new WebSocket("ws://localhost:3000/ws");

  socket.onopen = () => {
    console.log("🔗 WebSocket conectado correctamente");
  };

  socket.onerror = (err) => {
    console.error("❌ Error WebSocket:", err);
  };

  socket.onmessage = (msg) => {
    console.log("📩 Mensaje recibido desde WS:", msg.data);
  };

  socket.onclose = () => {
    console.warn("⚠️ WebSocket desconectado, reintentando...");
    setTimeout(connectWebSocket, 2000);
  };

  return socket;
}

export function sendWS(data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else {
    console.warn("⚠️ WebSocket no está listo para enviar");
  }
}
