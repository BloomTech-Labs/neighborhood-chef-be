const db = require("../../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
  findIfAlreadyFavorite,
  addFavoriteEvent,
  removeFavoriteEvent,
  findAllFavoriteEvents
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

function findIfAlreadyFavorite(favorite) {
  return db("User_Favorite_Events")
    .where("User_Favorite_Events.user_id", favorite.user_id)
    .andWhere("User_Favorite_Events.event_id", favorite.event_id)
    .first();
}

async function addFavoriteEvent(favoriteEvent) {
  const newFavorite = await db("User_Favorite_Events").insert(favoriteEvent);

  return db("Events").where("id", favoriteEvent.event_id).first();
}

function removeFavoriteEvent(favoriteEvent) {
  return db("User_Favorite_Events")
    .where("User_Favorite_Events.event_id", favoriteEvent.event_id)
    .andWhere("User_Favorite_Events.user_id", favoriteEvent.user_id)
    .del();
}

function findAllFavoriteEvents(id) {
  return db("Events")
    .join("User_Favorite_Events", "User_Favorite_Events.event_id", "Events.id")
    .where("User_Favorite_Events.user_id", id);
}
