exports.buildCodePrompt = (code, mode) => `
Eres una IA experta en programación.
Tarea: analizar y corregir código recibido.

Modo: ${mode}
Código recibido:
${code}
`;

exports.buildFilePrompt = (code, fileName) => `
Eres una IA experta en programación.
Archivo: ${fileName}
Tarea: 1) Detectar errores, 2) Explicarlos, 3) Corregir el código
Código:
${code}
`;

exports.buildGeneratePrompt = (instructions, language) => `
Eres una IA experta en programación.
Genera un código completo en ${language} según estas instrucciones:
${instructions}
Devuelve solo el código limpio sin explicaciones.
`;
