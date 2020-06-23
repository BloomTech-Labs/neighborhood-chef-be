exports.up = function (knex) {
    return knex.schema
        .createTable('Comments', tbl => {
            tbl.increments();
            tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('parent_id');
            tbl.integer('root_id');
            tbl.string('dateCreated');
            tbl.text('content');
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Comments')
};
