// security/auditLog.js
// Simple audit logger for sensitive actions - Editor: Tomas Galea
const logger = require('../utils/logger');

function audit(req, action, details = {}) {
  const entry = {
    ts: new Date().toISOString(),
    ip: req.ip,
    userId: req.userId || null,
    action,
    route: req.originalUrl,
    details
  };
  logger.info('AUDIT', entry);
}

module.exports = { audit };
