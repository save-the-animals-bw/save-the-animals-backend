const express = require("express");

const campaignsModel = require("./campaigns-model.js");
const organizationsModel = require("../organizations/organizations_model.js");

const router = express.Router();

router.get('/', (req, res) => {
    campaignsModel
      .findAllCampaigns()
      .then(campaigns => {
        if (!campaigns[0]) {
          res.json(null);
        } else {
          res.json(campaigns);
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to get campaigns list", err });
      });
})




module.exports = router