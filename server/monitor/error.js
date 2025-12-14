// monitor/errors.js
// In-memory error tracker (for demo). Integration: Sentry or external monitoring.
// Editor: Tomas Galea

const errors = [];

function record(err) {
  errors.push({ ts: new Date().toISOString(), error: err.message || String(err) });
  if (errors.length > 1000) errors.shift();
}

function list() {
  return errors.slice().reverse();
}

module.exports = { record, list };
