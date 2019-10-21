module.exports = (req, res, next) => {
  if (
    !req.body ||
    !req.body.username_o ||
    !req.body.email ||
    !req.body.password ||
    !req.body.organization_id
  ) {
    res
      .status(404)
      .json({ message: "Missing register info: username_o,email, password, or organization_id" });
  } else {
    next();
  }
};
