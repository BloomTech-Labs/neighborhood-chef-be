const db = require("../../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
  findUsersForEvent,
  inviteUserToEvent,
  findIfUserIsAlreadyInvited,
  updateInvite,
  removeInvite
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

function findUsersForEvent(id) {
  return db("Events")
    .select("Users.*", "Events_Status.status")
    .join("Events_Status", "Events_Status.event_id", "Events.id")
    .join("Users", "Users.id", "Events_Status.user_id")
    .where("Events.id", id);
}

function findIfUserIsAlreadyInvited(invite) {
  return db("Events_Status")
    .where("Events_Status.user_id", invite.user_id)
    .andWhere("Events_Status.event_id", invite.event_id)
    .first();
}

async function inviteUserToEvent(invite) {
  const invitation = await db("Events_Status").insert(invite);

  return findById(invite.event_id);
}

async function updateInvite(invite) {
  const updated = await db("Events_Status")
    .where("Events_Status.event_id", invite.event_id)
    .andWhere("Events_Status.user_id", invite.user_id)
    .update(invite)

  return db("Events").where("id", invite.event_id).first();
}

function removeInvite(invite) {
  return db("Events_Status")
    .where("Events_Status.event_id", invite.event_id)
    .andWhere("Events_Status.user_id", invite.user_id)
    .del();
}
