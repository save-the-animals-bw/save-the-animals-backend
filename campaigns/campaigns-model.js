const db = require("../database/dbConfig.js");

module.exports = {
  findAllCampaigns,
  findCampaignsById,
  findCampaignsByOrganId,
    addCampaign,
    updateCampaign,
    removeCampaign
};
function findAllCampaigns() {
  return db("campaigns");
}
function findCampaignsById(id) {
  return db("campaigns")
    .where({ id })
    .first();
}
function findCampaignsByOrganId(organization_id) {
  return db("campaigns")
    .join("organizations", "organizations.id", "campaigns.organization_id")
    .where({ organization_id: organization_id })
      .select(
        "campaigns.id as campaigns_id",
      "title",
      "organ_name",
      "location",
      "species",
      "urgency",
      "image_url"
    );
}

function addCampaign(campaign) {
  return db("campaigns")
    .insert(campaign, "id")
    .then(ids => {
      const [id] = ids;
      return findCampaignsById(id);
    });
}

function updateCampaign(id, change) {
    return db("campaigns")
      .where({ id })
      .update(change)
      .then(() => {
        return findCampaignsById(id);
      });
}

function removeCampaign(id) {
    return db('campaigns').where({ id }).del();
}