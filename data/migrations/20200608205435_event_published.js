exports.up = function(knex) {
    return knex.schema.table('Events', tbl => {
        tbl.boolean('published')
            .notNullable()
            .defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.table('Events', tbl => {
        tbl.dropColumn('published');
    });
};
