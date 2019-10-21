const organizationsModel = require("../organizations/organizations_model.js");

module.exports = (req, res, next) => {

  if (req.body.userType !== "support" && req.body.userType !== "organization") {
    res
      .status(404)
      .json({ message: "userType should be support or organization" });
  } else if (
    req.body.userType === "organization" &&
    !req.body.organization_id
  ) {
    res.status(404).json({
      message:
        "Organization user should have organizaiton_id which match with his/her organization"
    });
  } else if (req.body.userType === "support" && req.body.organization_id) {
    res.status(404).json({
      message: "Support user should not have organizaiton_id"
    });
  } else if (req.body.userType === "organization" && req.body.organization_id) {
      organizationsModel.findOrganizationById(req.body.organization_id).then(organ => {
          if (organ) {
              next();
          } else {
              res.status(404).json({
                message: "Can't not find organization by the giving organizaiton_id"
              });
        }
    })
  } else {
    next();
  }
};
