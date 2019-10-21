const db = require("../database/dbConfig.js");

module.exports = {
  findAllSupportUsers,
    findSupportUserById,
  findSupportUserByName,
  addSupportUser,
  updateSupportUser
};

function findAllSupportUsers() {
  return db("users_support").select("id",'username_s as username','userType');
}

function findSupportUserById(id) {
    return db("users_support").where({ id }).first();
}

function findSupportUserByName(username_s) {
    return db("users_support").where({ username_s }).first();
}

function addSupportUser(user) {
    return db('users_support').insert(user, 'id').then(ids => {
        const [id] = ids;
        return findSupportUserById(id)
    })
}
function updateSupportUser(id, change) {
    return null;
}