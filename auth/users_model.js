const db = require("../database/dbConfig.js");

module.exports = {
  findAllUsers,
  findUserById,
  findUserByName,
  addUser,
  updateUser
};

function findAllUsers() {
  return db("users").select("id", "username", "userType");
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findUserByName(username) {
  return db("users")
    .where({ username })
    .first()
    .then(user => {
      if (user.organization_id) {
        console.log(user.organization_id);
        return db("users")
          .join("organizations", "organizations.id", "users.organization_id")
          .where({ organization_id: user.organization_id })
          .select(
            "username as username",
            "password",
            "email",
            "userType",
            "users.id as user_id",
            "organ_name",
            "organization_id"
          )
          .first();
      } else {
        return user;
      }
    });
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}
function updateUser(id, change) {
  return null;
}
