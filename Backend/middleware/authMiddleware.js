const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader) return res.status(401).json({ msg: "No token, access denied" });

      const token = authHeader.split(" ")[1]; // Bearer <token>
      if (!token) return res.status(401).json({ msg: "No token, access denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied for this role" });
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = protect;
