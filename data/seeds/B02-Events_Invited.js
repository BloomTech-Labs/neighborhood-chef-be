exports.seed = function(knex) {
  return knex('Events_Invited').insert([
    {
      //id: 1,
      user_id: 0,
      event_id: 0,
    },
    {
      //id: 2,
      event_id: 0,
      user_id: 0,
      inviter_id: 0,
      approved: 0,
    },
  ]);
};
