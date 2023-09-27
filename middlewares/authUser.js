const JWT = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(500).json({ error: "server error" });
      user;
      req.user = user;
      console.log("authenticated");
      next();
    });
  } else {
    res.status(401).json("you're not authorized");
  }
}

module.exports = auth;
