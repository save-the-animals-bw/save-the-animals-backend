const organizationsModel = require('./organizations_model.js')

module.exports = (req, res, next) => {
    organizationsModel.findOrganizationById(req.params.id).then(organ => {
        if (!organ) {
            res.status(404).json({
                message: "Can't not find organization by the giving organizaiton_id"
            });
        } else {
            next();
        }
    })
}