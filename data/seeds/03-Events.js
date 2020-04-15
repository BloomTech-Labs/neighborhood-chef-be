exports.seed = function(knex) {
  return knex('Events').insert([
    {
      //id: 1,
      Date: '',
      Start_Time: '',
      End_Time: '',
      Title: 'BBQ',
      Description: '',
      Photo: null,
      category_id: 1,
      Modifiers: {},
      Address: '',
      Latitude: 0,
      Longitude: 0
    },
    {
      //id: 2,
      Date: '',
      Start_Time: '',
      End_Time: '',
      Title: 'Multi-course meal',
      Description: '',
      Photo: null,
      category_id: 4,
      Modifiers: {},
      Address: '',
      Latitude: 0,
      Longitude: 0
    },
  ]);
};
