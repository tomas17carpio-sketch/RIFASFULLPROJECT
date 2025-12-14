// adminMiddleware.js - Editor: Tomas Galea
module.exports = function requireAdmin(req, res, next) {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Require admin' });
  next();
};
