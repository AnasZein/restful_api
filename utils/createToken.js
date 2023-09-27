const JWT = require("jsonwebtoken");

module.exports = function (user) {
  return JWT.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};
