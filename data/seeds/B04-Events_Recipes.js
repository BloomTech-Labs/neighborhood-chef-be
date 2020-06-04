exports.seed = function(knex) {
  return knex('Events_Recipes').insert([
    {
      //id: 1,
      event_id: 1,
      recipe_id: 1,
    },
    {
      //id: 2,
      event_id: 2,
      recipe_id: 2,
    },
  ]);
};
