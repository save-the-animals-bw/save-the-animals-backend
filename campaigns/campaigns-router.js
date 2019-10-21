const express = require("express");

const campaignsModel = require("./campaigns-model.js");
const organizationsModel = require("../organizations/organizations_model.js");
const checkOrgan_Id = require('../organizations/checkOrganId-middleware.js')
const checkCampaignInput = require('./checkCampaignInput-middleware.js')
const router = express.Router();

router.get("/campaigns", (req, res) => {
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
});


router.get("/organizations/:id/campaigns", checkOrgan_Id, (req, res) => {
  campaignsModel
    .findCampaignsByOrganId(req.params.id)
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
});

router.post("/campaigns", checkCampaignInput,  (req, res) => {
  campaignsModel
    .addCampaign(req.body)
    .then(campaign => {
      res.status(200).json(campaign);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create the campaign", err });
    });
});


module.exports = router