const jwt = require("jsonwebtoken");

// ✅ Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token, "token");

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach decoded user (id, role, etc.)
    next();
  } catch (err) {
    console.log(err);

    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  console.log(req.user);

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { isAuthenticated, isAdmin };
