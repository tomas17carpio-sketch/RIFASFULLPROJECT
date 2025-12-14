/* ==========================================
   INDEX.JS — RIFASFULLPROJECT (BACKEND)
   Express + SQLite + WebSockets + IA + Admin + React
========================================== */

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
require("dotenv").config();

// ------------------------------
// EXPRESS + HTTP SERVER
// ------------------------------
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "1mb" }));
app.use(cors());

// ------------------------------
// RUTAS IA
// ------------------------------
const aiRoutes = require("./routes/ai");
app.use("/api/ai", aiRoutes);

// ------------------------------
// RUTAS ADMIN
// ------------------------------
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

// ------------------------------
// BASE DE DATOS SQLITE
// ------------------------------
const dbPath = path.join(__dirname, "database.db");

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
  console.log("📂 Archivo database.db creado");
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error SQLite:", err.message);
  else console.log("✅ Conectado a SQLite");
});

// Crear tabla de compradores
db.run(
  `CREATE TABLE IF NOT EXISTS compradores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT,
    cedula TEXT,
    telefono TEXT,
    correo TEXT,
    tickets INTEGER
  )`,
  (err) => {
    if (err) console.error("❌ Error creando tabla:", err.message);
    else console.log("✅ Tabla 'compradores' lista");
  }
);

// ------------------------------
// ENDPOINT DE COMPRA
// ------------------------------
app.post("/api/comprar", (req, res) => {
  const { nombre, apellido, cedula, telefono, correo, tickets } = req.body;

  db.run(
    `INSERT INTO compradores (nombre, apellido, cedula, telefono, correo, tickets)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, cedula, telefono, correo, tickets],
    function (err) {
      if (err) {
        console.error("❌ Error registrando compra:", err.message);
        return res.status(500).json({ error: "Error al guardar la compra" });
      }

      res.json({ message: "Compra registrada con éxito", id: this.lastID });
    }
  );
});

// ------------------------------
// SERVIDOR WEBSOCKET
// ------------------------------
const wss = new WebSocket.Server({ server, path: "/ws" });

wss.on("connection", (ws) => {
  console.log("🔗 Cliente conectado via WebSocket");
  ws.send("Conexión WebSocket establecida!");

  ws.on("message", (msg) => {
    console.log("📩 Mensaje recibido:", msg);
  });
});

// ------------------------------
// SERVIR REACT
// ------------------------------
const clientBuildPath = path.join(__dirname, "../client/build");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  console.warn("⚠️ Build de React no encontrado. Ejecuta `npm run build` en /client");
}

// ------------------------------
// INICIAR SERVIDOR
// ------------------------------
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Backend activo: http://localhost:${PORT}`);
  console.log(`📡 WebSocket en: ws://localhost:${PORT}/ws`);
});

// ------------------------------
// EXPORTAR DB (para uso en servicios o admin)
module.exports = db;
