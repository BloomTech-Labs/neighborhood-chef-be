const db = require("../../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
};

function find() {
  return db("Categories");
}

function findBy(filter) {
  return db("Categories").where(filter);
}

async function add(category) {
  const [id] = await db("Categories").insert(category).returning("id");

  return findById(id);
}

function findById(id) {
  return db("Categories").where("id", id).first();
}

function remove(id) {
  return db("Categories").where("id", id).del();
}
