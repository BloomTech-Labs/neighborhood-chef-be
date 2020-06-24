exports.up = function (knex) {
    return knex.schema
        .createTable('Comments', tbl => {
            tbl.increments();
            tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('parent_id').notNullable();
            tbl.integer('root_id').notNullable();
            tbl.datetime('dateCreated').notNullable().defaultTo(knex.fn.now());
            tbl.text('comment', 500).notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Comments')
};
