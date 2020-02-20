const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  verifyToken = token =>
    jwt.verify(
      token,
      process.env.SECRET_KEY,
      (error, decode) => decode || error
    );

  try {
    const header = req.headers.authorization;
    if (!header || header.split(" ")[0] !== "Bearer") {
      res.sendStatus(401).send("header con autorización incorrecta");
      return;
    }
    verifyToken(header.split(" ")[1]);
    next();
  } catch (error) {
    res.sendStatus(401).send("error: token de acceso no válido");
  }
};
