// server/routes/ai.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const aiController = require("../controllers/aiController");

// ===============================
// RUTAS PÚBLICAS IA
// ===============================
router.post("/chat", aiController.chat);
router.post("/validate", aiController.validate);
router.post("/email/generate", aiController.generateAndSendEmail);
router.post("/stats", aiController.stats);
router.post("/admin-query", aiController.adminQuery);
router.post("/update-file", aiController.updateFile);
router.post("/diseño", aiController.generarDiseño);

// ===============================
// RUTAS ADMIN (PROTEGIDAS)
// ===============================
router.post("/analyze", adminAuth, aiController.analyzeCode);
router.post("/generate", adminAuth, aiController.generateCode);
router.post("/analyze-file", adminAuth, aiController.analyzeFile);
router.post("/save-file", adminAuth, aiController.saveFile);

// ===============================
// RUTAS OPCIONALES SOLO ADMIN
// ===============================
// router.post("/secret", adminAuth, aiController.secretAdminFunction);

module.exports = router;
