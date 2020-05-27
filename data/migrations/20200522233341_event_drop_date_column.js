exports.up = function(knex) {
  return knex.schema.table('Events', tbl => {
    tbl.dropColumn('date');
  });
};

exports.down = function(knex) {
  return knex.schema.table('Events', tbl => {
    tbl.date('date');
  }).then(() => {
    return knex.raw('UPDATE "Events" SET "date" = DATE("startTime")');
  }).then(() => {
    return knex.schema.alterTable('Events', tbl => {
      tbl.date('date').notNullable().alter();
    });
  });
};
