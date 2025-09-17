function checkRole(role) {
  return (req, res, next) => {
    // citim rolul din header sau query
    const userRole = req.headers["x-user-role"] || req.query.role;

    if (!userRole) {
      return res.status(401).json({ message: "No role provided" });
    }

    if (userRole.toLowerCase() === role.toLowerCase()) {
      next(); // trece mai departe
    } else {
      return res.status(403).json({ message: "Forbidden. Wrong role!" });
    }
  };
}

module.exports = checkRole;
