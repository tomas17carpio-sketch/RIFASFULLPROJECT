// server/services/ai.service.js
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const { buildCodePrompt, buildFilePrompt, buildGeneratePrompt } = require("../utils/prompts");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ===============================
// Procesar código (modo: analizar, corregir, etc.)
// ===============================
exports.processCode = async (code, mode) => {
  const prompt = buildCodePrompt(code, mode);

  const completion = await openai.responses.create({
    model: "gpt-5.1",
    input: prompt
  });

  return completion.output_text;
};

// ===============================
// Generar código desde instrucciones
// ===============================
exports.generateCode = async (instructions, language = "JS") => {
  const prompt = buildGeneratePrompt(instructions, language);

  const completion = await openai.responses.create({
    model: "gpt-5.1",
    input: prompt
  });

  return completion.output_text;
};

// ===============================
// Analizar y corregir archivo existente
// ===============================
exports.analyzeFile = async (filePath) => {
  if (!fs.existsSync(filePath)) return "Archivo no encontrado";

  const code = fs.readFileSync(filePath, "utf-8");
  const prompt = buildFilePrompt(code, path.basename(filePath));

  const completion = await openai.responses.create({
    model: "gpt-5.1",
    input: prompt
  });

  return completion.output_text;
};

// ===============================
// Sobrescribir archivo corregido
// ===============================
exports.saveFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf-8");
  return "Archivo actualizado correctamente";
};
