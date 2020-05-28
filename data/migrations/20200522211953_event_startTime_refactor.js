exports.up = function(knex) {
  return knex.raw('alter TABLE "Events" ALTER COLUMN "startTime" TYPE TIMESTAMP WITH TIME ZONE USING "date" + "startTime" AT TIME ZONE \'UTC\'');
};

exports.down = function(knex) {
  return knex.raw('alter TABLE "Events" ALTER COLUMN "startTime" TYPE TIME WITHOUT TIME ZONE');
};
