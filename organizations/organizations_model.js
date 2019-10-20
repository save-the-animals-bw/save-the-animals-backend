const db = require('../database/dbConfig.js');

module.exports = {
    findAllOrganizations,
    findOrganizationById,
    addOrganization
    
}

function findAllOrganizations() {
    return db("organizations");
}

function findOrganizationById(id) {
    return db("organizations").where({ id }).first();
}

function addOrganization(organization) {
    return db("organizations").insert(organization, "id")
        .then(([id]) => {
        return findOrganizationById(id)
    })
}

