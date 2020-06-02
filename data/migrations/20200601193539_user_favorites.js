exports.up = function(knex) {
    return knex.schema
        .createTable('User_Favorite_Events', tbl => {
            tbl.integer('event_id').notNullable().unsigned().references('Events.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.primary(['event_id', 'user_id']);
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('User_Favorite_Events');
};
