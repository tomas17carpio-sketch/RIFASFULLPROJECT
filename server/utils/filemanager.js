const fs = require("fs");
const path = require("path");

async function backupAndWriteFile(targetPath, newContent) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const backupPath = targetPath + ".bak-" + Date.now();
  if (fs.existsSync(targetPath)) fs.copyFileSync(targetPath, backupPath);
  fs.writeFileSync(targetPath, newContent, "utf8");
}

module.exports = { backupAndWriteFile };
