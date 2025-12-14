// monitor/uptime.js
// Simple uptime health check endpoint helper (can integrate Prometheus)
/* Editor: Tomas Galea */

let start = Date.now();
function getUptime() {
  return Date.now() - start;
}
module.exports = { getUptime };
