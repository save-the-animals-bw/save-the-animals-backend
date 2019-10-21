module.exports = (req, res, next) => {
  if (
    !req.body ||
    !req.body.title ||
    !req.body.location ||
    !req.body.species ||
      !req.body.urgency ||
      !req.body.organization_id
  ) {
    res
      .status(404)
      .json({
        message: "Missing register info: title, location, species, urgency or organization_id"
      });
  } else {
    next();
  }
};
