const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header) return res.status(401).json({ message: 'No token provided' });
  const parts = header.split(' ');
  const token = parts.length === 2 ? parts[1] : parts[0];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Admin role required' });
  next();
};
