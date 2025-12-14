// ensureUploadDir.js - ensure uploads folder exists - Editor: Tomas Galea
const fs = require('fs');
const path = require('path');

function ensure() {
  const dir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

module.exports = ensure;
