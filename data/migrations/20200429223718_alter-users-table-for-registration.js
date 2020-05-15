
exports.up = function (knex) {
  return knex.schema.alterTable('Users', function (t) {
    t.boolean('Activated')
      .notNullable()
      .defaultTo(false);
    t.dropColumn('password');
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('Users', function (t) {
    t.dropColumn('Activated');
    t.string('password', 128)
  })
};
