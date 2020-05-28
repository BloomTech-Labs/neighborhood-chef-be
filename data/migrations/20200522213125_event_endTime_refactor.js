exports.up = function(knex) {
  return knex.raw('alter TABLE "Events" ALTER COLUMN "endTime" TYPE TIMESTAMP WITH TIME ZONE USING "date" + "endTime" AT TIME ZONE \'UTC\'');
};

exports.down = function(knex) {
  return knex.raw('alter TABLE "Events" ALTER COLUMN "endTime" TYPE TIME WITHOUT TIME ZONE');
};
