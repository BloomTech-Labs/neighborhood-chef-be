exports.seed = function(knex) {
    return knex('IngredientTypes').insert([
        {
            //id: 1,
            ingredientType: 'Seasoning',
        },
        {
            //id: 2,
            ingredientType: 'Meat',
        },
        {
            //id: 3,
            ingredientType: 'Vegetable',
        },
        {
            //id: 4,
            ingredientType: 'Fruit',
        },
        {
            //id: 5,
            ingredientType: 'Grain',
        },
        {
            //id: 6,
            ingredientType: 'Nut',
        },
        {
            //id: 7,
            ingredientType: 'Seed',
        },
        {
            //id: 8,
            ingredientType: 'Fat',
        },
        {
            //id: 9,
            ingredientType: 'Herb',
        },
    ]);
};
