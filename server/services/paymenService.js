// services/paymentService.js
// Lógica de validación básica y anti-fraude para pagos - Editor: Tomas Galea

const db = require('../config/db');
const logger = require('../utils/logger');

async function basicSanityCheck(payment) {
  // chequeos simples: monto positivo, teléfono válido, etc.
  if (!payment.amount || Number(payment.amount) <= 0) return { ok: false, reason: 'Monto inválido' };
  if (!/^[0-9]{7,15}$/.test(payment.phone)) return { ok: false, reason: 'Teléfono inválido' };
  if (!/^[0-9A-Za-z\-]{3,50}$/.test(payment.idNumber)) return { ok: false, reason: 'Cédula inválida' };
  return { ok: true };
}

async function flagSuspicious(payment) {
  // ejemplo simple: montos muy altos -> marcar
  if (Number(payment.amount) > 1000000) {
    logger.warn('Suspicious payment amount', { payment });
    return true;
  }
  return false;
}

module.exports = { basicSanityCheck, flagSuspicious };
