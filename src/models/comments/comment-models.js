const db = require("../../../data/dbConfig.js");

module.exports = {
    findAllEventComments,
    findBy,
    findById,
    add,
    update,
    remove,
};

function findAllEventComments(eventId) {
    return db("Comments").where("event_id", eventId);
}

function findBy(filter) {
    return db("Comments").where(filter);
}

async function add(comment) {
    const [id] = await db("Comments").insert(comment).returning("id");

    return findById(id);
}

function findById(id) {
    return db("Comments").where("id", id).first();
}

function update(id, changes) {
    return db("Comments")
        .where({ id })
        .update(changes)
        .returning("id")
        .then((count) => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
    return db("Comments").where({ id }).del();
}