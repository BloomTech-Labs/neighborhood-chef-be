exports.up = function (knex) {
    return knex.schema.table('Events', tbl => {
        tbl.json('allergenWarnings');
        tbl.json('dietaryWarnings');
    });
};

exports.down = function (knex) {
    return knex.schema.table('Events', tbl => {
        tbl.dropColumn('allergenWarnings');
        tbl.dropColumn('dietaryWarnings');
    });
};
