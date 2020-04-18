exports.seed = function(knex) {
  return knex('Events_Invited').insert([
    {
      //id: 1,
      event_id: 1,
      user_id: 2,
      inviter_id: 1,
      approved: false,
    },
    {
      //id: 2,
      event_id: 2,
      user_id: 1,
      inviter_id: 2,
      approved: true,
    },
  ]);
};
