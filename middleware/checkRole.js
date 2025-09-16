function checkRole(requiredRole) {
  return (req, res, next) => {
    const role = req.header("x-user-role"); // citim rolul din header-ul cererii

    if (!role) {
      return res.status(401).json({ message: "No role header provided" });
    }

    if (role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next(); // dacă rolul e corect, mergem mai departe
  };
}

module.exports = checkRole;
