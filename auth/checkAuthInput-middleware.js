module.exports = (req, res, next) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password 
  ) {
    res
      .status(404)
      .json({ message: "Missing register info: username,email, or password" });
  } else {
    next();
  }
};
