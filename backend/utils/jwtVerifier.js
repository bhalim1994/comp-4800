const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = payload;
    next();
  });
}

module.exports = verifyAccessToken;
