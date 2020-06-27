
exports.up = function (knex) {
    return knex.schema
        .createTable('Comment_Reactions', tbl => {
            tbl.integer('comment_id').notNullable().unsigned().references('Comments.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.integer('user_id').notNullable().unsigned().references('Users.id').onUpdate('CASCADE').onDelete('CASCADE');
            tbl.enum('reaction', ['heart', 'thumbsUp', 'thumbsDown', 'Happy', 'Laugh', 'Sad', 'Angry']).notNullable();
            tbl.primary(['comment_id', 'user_id']);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Comment_Reactions')
};
