exports.up = function(knex) {
  return knex.schema
    .createTable('Users', tbl => {
      tbl.increments();
      tbl.string('Email', 255)
        .unique()
        .notNullable();
      tbl.string('Password', 128)
        .notNullable();
      tbl.string('FirstName', 64)
        .notNullable();
      tbl.string('LastName', 64)
        .notNullable();
      tbl.string('Gender', 64);
      tbl.string('Address', 255)
        .notNullable();
      tbl.decimal('Latitude')
        .notNullable();
      tbl.decimal('Longitude')
        .notNullable();
      tbl.binary('Photo');
    })
    .createTable('Categories', tbl => {
      tbl.increments();
      tbl.text('Category')
        .unique()
        .notNullable();
    })
    .createTable('Events', tbl => {
      tbl.increments();
      tbl.date('Date')
        .notNullable();
      tbl.time('Start_Time')
        .notNullable();
      tbl.time('End_Time');
      tbl.string('Title', 255)
        .notNullable();
      tbl.text('Description')
        .notNullable();
      tbl.binary('Photo');
      tbl.integer('category_id')
        .notNullable()
        .unsigned()
        .references('Categories.id');
      tbl.json('Modifiers');
      tbl.string('Address', 255)
        .notNullable();
      tbl.decimal('Latitude')
        .notNullable();
      tbl.decimal('Longitude')
        .notNullable();
    })
    //Bridge Tables below
    .createTable('Events_Attending', tbl => {
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('event_id')
        .notNullable()
        .unsigned()
        .references('Events.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['user_id', 'event_id']);
    })
    .createTable('Events_Invited', tbl => {
      tbl.integer('event_id')
        .notNullable()
        .unsigned()
        .references('Events.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('inviter_id')
        .notNullable()
        .unsigned()
        .references('Users.id')
        .onUpdate('CASCADE')
        // .onDelete('CASCADE')
        ;
      tbl.boolean('approved')
        .notNullable()
        .defaultTo('false');
      tbl.primary(['event_id', 'user_id']);
    })
    ;
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Events_Invited')
    .dropTableIfExists('Events_Attending')
    .dropTableIfExists('Categories')
    .dropTableIfExists('Events')
    .dropTableIfExists('Users');
};
