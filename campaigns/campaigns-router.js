const express = require("express");

const campaignsModel = require("./campaigns-model.js");
const usersModel = require("../auth/users_model.js");

const restricted_supporter = require("./restricted_supporter-middleware");
const checkOrgan_Id = require("../organizations/checkOrganId-middleware.js");
const checkCampaignInput = require("./checkCampaignInput-middleware.js");

const restricted_organization = require("./restricted_organization-middleware.js");
const router = express.Router();

router.get("/campaigns/supporters", restricted_supporter, (req, res) => {
  campaignsModel
    .findAllCampaigns()
    .then(campaigns => {
      if (!campaigns[0]) {
        res.json(null);
      } else {
        res.json({ loggedInUser: req.user, campaigns });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get campaigns list", err });
    });
});

router.get("/campaigns/organizations", restricted_organization, (req, res) => {
  usersModel
    .findUserByName(req.user.username)
    .then(user => {
      campaignsModel
        .findCampaignsByOrganId(user.organization_id)
        .then(campaigns => {
          if (!campaigns[0]) {
            res.json(null);
          } else {
            res.json({ loggedInUser: req.user, campaigns });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "Failed to get campaigns list", err });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get the user info", err });
    });
});

router.post(
  "/campaigns",
  checkCampaignInput,
  restricted_organization,
  (req, res) => {
    campaignsModel
      .addCampaign(req.body)
      .then(campaign => {
        res.status(200).json(campaign);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create the campaign", err });
      });
  }
);

router.get("/campaigns/:id", restricted_organization, (req, res) => {
  campaignsModel
    .findCampaignsById(req.params.id)
    .then(campaign => {
      if (!campaign) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        res.status(200).json(campaign);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to find the campaign", err });
    });
});

router.put("/campaigns/:id", restricted_organization, (req, res) => {
  campaignsModel
    .findCampaignsById(req.params.id)
    .then(campaign => {
      if (!campaign) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        campaignsModel
          .updateCampaign(req.params.id, req.body)
          .then(campaign => {
            res.status(200).json({ message: "updated", campaign });
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "Failed to update the campaign", err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to find the campaign", err });
    });
});

router.delete("/campaigns/:id", restricted_organization, (req, res) => {
  campaignsModel
    .findCampaignsById(req.params.id)
    .then(campaign => {
      if (!campaign) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        campaignsModel
          .removeCampaign(req.params.id)
          .then(() => {
            res.status(200).json({ message: "removed" });
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "Failed to remove the campaign", err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to find the campaign", err });
    });
});

module.exports = router;
