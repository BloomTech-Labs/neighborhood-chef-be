exports.up = function(knex) {
    return knex.schema.table('Users', tbl => {
        tbl.json('allergens');
        tbl.json('dietaryRestrictions');
        tbl.json('dietaryPreferences');
        tbl.json('children');
        tbl.json('pets');
    });
};

exports.down = function(knex) {
    return knex.schema.table('Users', tbl => {
        tbl.dropColumn('allergens');
        tbl.dropColumn('dietaryRestrictions');
        tbl.dropColumn('dietaryPreferences');
        tbl.dropColumn('children');
        tbl.dropColumn('pets');
    });
};
