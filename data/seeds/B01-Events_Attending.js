exports.seed = function(knex) {
  return knex('Events_Attending').insert([
    {
      //id: 1,
      event_id: 1,
      user_id: 2,
    },
    {
      //id: 2,
      event_id: 2,
      user_id: 1,
    },
  ]);
};
