const db = require("../database/dbConfig.js");

module.exports = {
  findAllCampaigns,
  
    findCampaignsByOrganId,
  addCampaign,
};
function findAllCampaigns(){
    return db("campaigns")
      
}

function findCampaignsByOrganId(organization_id) {
  return db("campaigns")
    .join("organizations", "organizations.id", "campaigns.organization_id")
    .where({ organization_id: organization_id })
    .select("title",'campaigns.id as campaigns_id','location','species','urgency',"image_url");
    
}  

function addCampaign() {
    return null
}