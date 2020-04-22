const db = require("../../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db("Users");
}

function findBy(filter) {
  return db("Users").where(filter);
}

async function add(user) {
  const [id] = await db("Users").insert(user).returning("id");

  return findById(id);
}

function findById(id) {
  return db("Users").where("id", id).first();
}

function update(id, changes) {
  return db("Users")
    .where({ id })
    .update(changes)
    .returning("id")
    .then((count) => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
  return db("Users").where({ id }).del();
}