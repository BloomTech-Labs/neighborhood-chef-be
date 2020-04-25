const db = require("../../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
  findInvitedEvents,
  findEventsAttending,
};

function find() {
  return db("Events");
}

function findBy(filter) {
  return db("Events").where(filter);
}

async function add(event) {
  const [id] = await db("Events").insert(event).returning("id");

  return findById(id);
}

function findById(id) {
  return db("Events").where("id", id).first();
}

function update(id, changes) {
  return db("Events")
    .where({ id })
    .update(changes)
    .returning("id")
    .then((count) => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
  return db("Events").where({ id }).del();
}

function findInvitedEvents(id) {
  return db("Events")
    .select("Events.*")
    .join("Events_Invited", "Events_Invited.event_id", "Events.id")
    .where("Events_Invited.user_id", id);
}

function findEventsAttending(id) {
  return db("Events")
    .select("Events.*")
    .join("Events_Attending", "Events_Attending.event_id", "Events.id")
    .where("Events_Attending.user_id", id);
}
