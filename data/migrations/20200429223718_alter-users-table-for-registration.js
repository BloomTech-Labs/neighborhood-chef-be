
exports.up = function (knex) {
  return knex.schema.alterTable('Users', function (t) {
    t.boolean('activated')
      .notNullable()
      .defaultTo(false);
    t.dropColumn('password');
  })
};

exports.down = function (knex) {
  return knex.schema.alterTable('Users', function (t) {
    t.dropColumn('activated');
    t.string('password', 128)
  })
};
