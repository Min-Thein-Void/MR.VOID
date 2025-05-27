const jwt = require("jsonwebtoken");
let User = require("../Model/User");
const AuthMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedValue) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthenticated, Invalid or expired token." });
      } else {
          User.findById(decodedValue._id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(401).json({ message: "Token need to provide..." });
  }
};
module.exports = AuthMiddleware;
