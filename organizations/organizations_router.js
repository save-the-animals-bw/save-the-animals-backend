const express = require("express");

const organizationsModel = require("./organizations_model.js");
const campaignsModel = require("../campaigns/campaigns-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  organizationsModel
    .findAllOrganizations()
    .then(organizations => {
      res.json(organizations);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Failed to get organizations list", error });
    });
});

router.get("/:id", (req, res) => {
  organizationsModel
    .findOrganizationById(req.params.id)
    .then(organization => {
      if (organization) {
        res.status(200).json(organization);
      } else {
        res
          .status(404)
          .json({
            message: "Could not find the organization with the giving id"
          });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to get organization", error });
    });
});

router.post("/", (req, res) => {
  if (!req.body || !req.body.organ_name) {
    res.status(401).json({
      message: "Require organ_name to add an organization"
    });
  } else {
    organizationsModel
      .addOrganization(req.body)
      .then(organization => {
        res.status(201).json({ message: "Added organization", organization });
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "Failed to save the organization", error });
      });
  }
});

router.get("/:id/campaigns", (req, res) => {
  organizationsModel.findOrganizationById(req.params.id).then(organ => {
    if (!organ) {
      res.status(404).json({
        message: "Can't not find organization by the giving organizaiton_id"
      });
    } else {
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
          res
            .status(500)
            .json({ message: "Failed to get campaigns list", err });
        });
    }
  });
});

module.exports = router;
