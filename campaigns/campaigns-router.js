const express = require("express");

const campaignsModel = require("./campaigns-model.js");
const usersModel = require("../auth/users_model.js");

const restricted_supporter = require("./restricted_supporter-middleware");
const checkCampaignInput = require("./checkCampaignInput-middleware.js");
const restricted_organization = require("./restricted_organization-middleware.js");

const router = express.Router();

// restricted_supporter- check if the user is supporter
// return all campaigns
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

// restricted_organization- make sure the user is from one of the organization
// get the organizaion_id info from the user, and return the campaigns by the organizaiton_id
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

// only the organization can post campaigns
// checkCampaignInput - check the req data
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

// get the campaign by campaign_id
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

// edit the campaign by campaign_id
router.put("/campaigns/:id", (req, res) => {
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

// delete the campaign by campaign_id
router.delete("/campaigns/:id", restricted_organization, (req, res) => {
  campaignsModel
    .findCampaignsById(req.params.id)
    .then(campaign => {
      if (!campaign) {
        res.status(401).json({ message: " Invalid Id", err });
      } else {
        campaignsModel
          .removeCampaign(req.params.id)
          .then(result => {
            res.status(200).json(result);
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
