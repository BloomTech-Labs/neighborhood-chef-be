const bcrypt = require('bcryptjs');
const passwordStrength = 12;

exports.seed = function(knex) {
  return knex('Users').insert([
    {
      //id: 1,
      Email: 'LambdaLabsPT9NeighborhoodChef+SwedishChef@gmail.com',
      Password: bcrypt.hashSync('B0rkB0rkB0rk', passwordStrength),
      FirstName: 'Swedish',
      LastName: 'Chef',
      Gender: 'Male',
      Address: 'Sweden',
      Latitude: 60.8934744,
      Longitude: -0.2821392,
      Photo: 'https://upload.wikimedia.org/wikipedia/en/e/e7/The_Swedish_Chef.jpg'
    },
    {
      //id: 2,
      Email: 'LambdaLabsPT9NeighborhoodChef+GordonRamsay@gmail.com',
      Password: bcrypt.hashSync('F*ckOff!', passwordStrength),
      FirstName: 'Gordon',
      LastName: 'Ramsay',
      Gender: 'Male',
      Address: 'South London, UK',
      Latitude: 51.4012818,
      Longitude: -0.1936287,
      Photo: 'https://media1.popsugar-assets.com/files/thumbor/T3DQJy12Bs1_C2mitXxG3RDNiNI/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/03/14/920/n/1922398/ed69b0e73f38b4b1_HK1503_DinnerServ_0195_hires2.jpg'
    },
  ]);
};
