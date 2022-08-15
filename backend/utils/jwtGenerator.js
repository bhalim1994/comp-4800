const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user) {
  const { password, ...payload } = user;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
  return token;
}

module.exports = jwtGenerator;
