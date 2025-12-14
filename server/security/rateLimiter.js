// security/rateLimiter.js
// Simple express rate-limiter using in-memory counters (for production use Redis)
// Editor: Tomas Galea

const rateMap = new Map();
const WINDOW_MS = 60 * 1000; // 1 min
const MAX_REQUESTS = 120;

module.exports = function rateLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const info = rateMap.get(key) || { ts: now, count: 0 };
  if (now - info.ts > WINDOW_MS) {
    info.ts = now;
    info.count = 1;
  } else {
    info.count++;
  }
  rateMap.set(key, info);
  if (info.count > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests' });
  }
  next();
};
