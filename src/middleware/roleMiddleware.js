export function authorizeRoles(...allowed) {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole || !allowed.includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
}
