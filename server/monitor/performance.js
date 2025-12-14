// monitor/performance.js
// Simple timing wrapper
// Editor: Tomas Galea

function timeit(fn) {
  return async function(...args) {
    const t0 = Date.now();
    const r = await fn(...args);
    const t1 = Date.now();
    return { result: r, ms: t1 - t0 };
  };
}

module.exports = { timeit };
