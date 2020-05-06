exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
      tbl.increments();
      tbl.string('Email', 255).unique().notNullable();
      tbl.string('Password', 128).notNullable();
      tbl.string('FirstName', 64).notNullable();
      tbl.string('LastName', 64).notNullable();
      tbl.string('Gender', 64);
      tbl.string('Address', 255).notNullable();
      tbl.decimal('Latitude', 9, 6).notNullable();
      tbl.decimal('Longitude', 9, 6).notNullable();
      tbl.binary('Photo');
    })
    .createTable('Categories', tbl => {
      tbl.increments();
      tbl.text('Category').unique().notNullable();
    })
    .createTable('Events', tbl => {
      tbl.increments();
      tbl.integer('user_id').notNullable().unsigned().references('Users.id');
      tbl.date('Date').notNullable();
      tbl.time('Start_Time').notNullable();
      tbl.time('End_Time');
      tbl.string('Title', 255).notNullable();
      tbl.text('Description').notNullable();
      tbl.binary('Photo');
      tbl.integer('category_id').notNullable().unsigned().references('Categories.id');
      tbl.json('Modifiers');
      tbl.json('Hashtags');
      tbl.string('Address', 255).notNullable();
      tbl.decimal('Latitude', 9, 6).notNullable();
      tbl.decimal('Longitude', 9, 6).notNullable();
    })
    //Bridge Tables below
    .createTable('Events_Attending', tbl => {
      tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.primary(['event_id', 'user_id']);
    })
    .createTable('Events_Invited', tbl => {
      tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
      tbl.integer('inviter_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE');
      tbl.boolean('approved').notNullable().defaultTo('false');
      tbl.primary(['event_id', 'user_id']);
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Events_Invited')
    .dropTableIfExists('Events_Attending')
    .dropTableIfExists('Events')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Users');
};
