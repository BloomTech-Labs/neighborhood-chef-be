exports.seed = function(knex) {
  return knex('Events_Attending').insert([
    {
      //id: 1,
      user_id: 0,
      event_id: 0,
    },
    {
      //id: 2,
      user_id: 0,
      event_id: 0,
    },
  ]);
};
