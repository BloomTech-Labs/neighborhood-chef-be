exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
      tbl.increments();
      tbl.string('email', 255).unique().notNullable();
      tbl.string('password', 128).notNullable();
      tbl.string('firstName', 64).notNullable();
      tbl.string('lastName', 64).notNullable();
      tbl.string('gender', 64);
      tbl.string('address', 255).notNullable();
      tbl.decimal('latitude', 9, 6).notNullable();
      tbl.decimal('longitude', 9, 6).notNullable();
      tbl.binary('photo');
    })
    .createTable('Categories', tbl => {
      tbl.increments();
      tbl.text('category').unique().notNullable();
    })
    .createTable('Events', tbl => {
      tbl.increments();
      tbl.integer('user_id').notNullable().unsigned().references('Users.id');
      tbl.date('date').notNullable();
      tbl.time('startTime').notNullable();
      tbl.time('endTime');
      tbl.string('title', 255).notNullable();
      tbl.text('description').notNullable();
      tbl.binary('photo');
      tbl.integer('category_id').notNullable().unsigned().references('Categories.id');
      tbl.json('modifiers');
      tbl.json('hashtags');
      tbl.string('address', 255).notNullable();
      tbl.decimal('latitude', 9, 6).notNullable();
      tbl.decimal('longitude', 9, 6).notNullable();
    })
    //Bridge Tables below
    .createTable('Events_Status', tbl => {
      tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('inviter_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE');
      tbl.enum('status', [ 'Not Approved', 'Approved', 'Not Going', 'Maybe Going', 'Going' ]).notNullable().defaultTo('false');
      tbl.primary(['event_id', 'user_id']);
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Events_Status')
    .dropTableIfExists('Events')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Users');
};
