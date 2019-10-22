const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
         
        req.user = {
          username: decodedToken.username,
          userType: decodedToken.userType
          
        };
        
        if (req.user.userType === "organization") {
          next();
        } else {
          res.status(403).json({ message: "You cannot touch this" });
        }
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
