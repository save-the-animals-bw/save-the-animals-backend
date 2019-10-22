module.exports = () => {
  return (req, res, next) => {
    if (req.user.userType==="support") {
      next();
    } else {
      res.status(403).json({ you: "can't touch this!" });
    }
  };
};
