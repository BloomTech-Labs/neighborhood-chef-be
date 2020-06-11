exports.seed = function(knex) {
    return knex('Event_Ingredients').insert([
        {
            event_id: 1,
            description: "Basil",
            requested: true,
            user_id: 1
        },
        {
            event_id: 2,
            description: "Tomato",
            requested: true,
            user_id: 2
        }

    ]);
};