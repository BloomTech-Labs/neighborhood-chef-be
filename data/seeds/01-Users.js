exports.seed = function (knex) {
  return knex('Users').insert([
    {
      //id: 1,
      email: 'LambdaLabsPT9NeighborhoodChef+SwedishChef@gmail.com',
      firstName: 'Swedish',
      lastName: 'Chef',
      gender: 'male',
      address: 'Sweden',
      latitude: 60.8934744,
      longitude: -0.2821392,
      photo: 'https://upload.wikimedia.org/wikipedia/en/e/e7/The_Swedish_Chef.jpg',
      pets: {},
      allergens: {},
      dietaryRestrictions: {},
      dietaryPreferences: {},
      children: {}
    },
    {
      //id: 2,
      email: 'LambdaLabsPT9NeighborhoodChef+GordonRamsay@gmail.com',
      firstName: 'Gordon',
      lastName: 'Ramsay',
      gender: 'male',
      address: 'South London, UK',
      latitude: 51.4012818,
      longitude: -0.1936287,
      photo: 'https://media1.popsugar-assets.com/files/thumbor/T3DQJy12Bs1_C2mitXxG3RDNiNI/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/03/14/920/n/1922398/ed69b0e73f38b4b1_HK1503_DinnerServ_0195_hires2.jpg',
      pets: {},
      allergens: {},
      dietaryRestrictions: {},
      dietaryPreferences: {},
      children: {}
    },
  ]);
};
