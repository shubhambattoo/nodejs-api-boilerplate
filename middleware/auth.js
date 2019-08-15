const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.header("Authorization");
  const token = header.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;