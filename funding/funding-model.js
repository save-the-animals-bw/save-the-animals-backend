const db = require('../database/dbConfig.js')

module.exports = {
    findAllFunding,
    findFundingById,
    addFunding,
    updateFunding,
    removeFunding,
    findFundingByCampaignId,
    sumOfFundingsByCampaignId,
}

function findAllFunding() {
    return db('funding')
}

function findFundingById(id) {
    return db('funding').where({id}).first()
}

function addFunding(funding) {
    return db("funding")
      .insert(funding, "id")
      .then(ids => {
        const [id] = ids;
        return findFundingById(id);
      });
}

function updateFunding(id, change) {
    return db("funding")
      .where({ id })
      .update(change)
      .then(() => {
        return findFundingById(id);
      });
}

function removeFunding(id) {
    return db("funding")
      .where({ id })
      .del()
        .then(result => {
            if (result = 1) {
              return "removed";
            } else {
              return "Failed to remove";
            }
      })
}

function findFundingByCampaignId(campaign_id) {
    return db("funding").join(
      "campaigns",
      "campaigns.id",
      "funding.campaign_id"
    ).where({campaign_id:campaign_id}).select("funding.id as funding_id","donation_name","amount_need","campaigns.id as campaign_id")
}

function sumOfFundingsByCampaignId(campaign_id) {
  return db("funding")
    .join("campaigns", "campaigns.id", "funding.campaign_id")
    .where({ campaign_id: campaign_id })
    .sum("amount_need")
}