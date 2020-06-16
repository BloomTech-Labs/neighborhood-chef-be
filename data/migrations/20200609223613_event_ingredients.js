
exports.up = function(knex) {
  return knex.schema.createTable("Event_Ingredients", tbl => {
    tbl.increments();
    tbl.integer('event_id').notNullable().unsigned().references('Events.id');
    tbl.string('description', 255).notNullable();
    tbl.boolean('requested').notNullable().defaultTo(false);
    tbl.integer('user_id').unsigned().references('Users.id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Event_ingredients');
};
