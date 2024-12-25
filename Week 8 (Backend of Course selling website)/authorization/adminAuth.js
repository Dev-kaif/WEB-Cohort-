const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config")

function adminAuth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }
  try {
    
    const response = jwt.verify(token, JWT_ADMIN_SECRET);

    if (response) {
      req.adminID = response.id;
      next();

    } else {
      return res.status(403).json({ message: "Invalid token. Authorization failed." });
    }

  } catch (err) {

    return res.status(500).json({ message: "An error occurred during authentication." });
  }
}

module.exports = { adminAuth };
