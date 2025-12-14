const fs = require("fs");
const path = require("path");
const { processCode, generateCode, analyzeFile, saveFile } = require("../services/ai.service");
const { OpenAI } = require("openai");

// ===============================
// IA NUEVA
// ===============================
exports.analyzeCode = async (req, res) => {
  try {
    const { code, mode } = req.body;
    if (!code) return res.status(400).json({ message: "Código requerido" });
    const output = await processCode(code, mode || "analizar");
    res.json({ success: true, result: output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error procesando código" });
  }
};

exports.generateCode = async (req, res) => {
  try {
    const { instructions, language } = req.body;
    if (!instructions) return res.status(400).json({ message: "Instrucciones requeridas" });
    const output = await generateCode(instructions, language || "JS");
    res.json({ success: true, result: output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generando código" });
  }
};

exports.analyzeFile = async (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath) return res.status(400).json({ message: "Ruta requerida" });

    const fullPath = path.join(__dirname, "..", filePath);
    const output = await analyzeFile(fullPath);

    res.json({ success: true, result: output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analizando archivo" });
  }
};

exports.saveFile = async (req, res) => {
  try {
    const { filePath, content } = req.body;
    if (!filePath || !content) return res.status(400).json({ message: "Datos incompletos" });

    const fullPath = path.join(__dirname, "..", filePath);
    const msg = saveFile(fullPath, content);

    res.json({ success: true, message: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error guardando archivo" });
  }
};

exports.generarDiseño = async (req, res) => {
  try {
    const { instrucciones } = req.body;
    if (!instrucciones)
      return res.status(400).json({ error: "No se recibieron instrucciones de diseño" });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
      Genera un componente React + Tailwind completo basado en estas instrucciones:
      ${instrucciones}
      Devuelve solo el código JSX limpio, sin explicaciones.
    `;

    const completion = await openai.responses.create({
      model: "gpt-5.1",
      input: prompt
    });

    const codigo = completion.output_text;

    fs.writeFileSync(
      path.join(__dirname, "../../client/src/components/ComponenteIA.jsx"),
      codigo
    );

    res.json({ message: "Componente generado", file: "ComponenteIA.jsx" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando diseño" });
  }
};

// ===============================
// FUNCIONES ANTIGUAS (REPARAMOS TODAS)
// ===============================
exports.chat = async (req, res) => {
  res.json({ message: "chat() aún no implementado" });
};

exports.validate = async (req, res) => {
  res.json({ message: "validate() aún no implementado" });
};

exports.generateAndSendEmail = async (req, res) => {
  res.json({ message: "generateAndSendEmail() aún no implementado" });
};

exports.stats = async (req, res) => {
  res.json({ message: "stats() aún no implementado" });
};

exports.adminQuery = async (req, res) => {
  res.json({ message: "adminQuery() aún no implementado" });
};

exports.updateFile = async (req, res) => {
  res.json({ message: "updateFile() aún no implementado" });
};
