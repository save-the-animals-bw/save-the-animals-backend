module.exports = (req, res, next) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.userType
  ) {
    res
      .status(404)
      .json({ message: "Missing register info: username,email, userType or password" });
  } else {
    next();
  }
};
