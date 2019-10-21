const db = require("../database/dbConfig.js");

module.exports = {
  findAllOrganUsers,
  findOrganUserById,
  findOrganUserByName,
  addOrganUser,
  updateOrganUser
};

function findAllOrganUsers() {
  return db("users_organization").select(
    "id",
    "username_o as username",
    "userType"
  );
}

function findOrganUserById(id) {
  return db("users_organization")
    .where({ id })
    .first();
}

function findOrganUserByName(username_o) {
  return db("users_organization")
    .where({ username_o })
    .first()
    .then(user => {
      console.log(user.organization_id);
      return db("users_organization")
        .join(
          "organizations",
          "organizations.id",
          "users_organization.organization_id"
        )
        .where({ organization_id: user.organization_id })
        .select(
          "username_o as username",
          "password",
          "email",
          "userType",
          "users_organization.id as user_id",
          "organ_name",
          "organization_id"
        )
        .first();
    });
}

function addOrganUser(user) {
  return db("users_organization")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findOrganUserById(id);
    });
}
function updateOrganUser(id, change) {
  return null;
}
