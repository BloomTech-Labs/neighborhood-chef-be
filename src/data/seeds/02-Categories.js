exports.seed = function(knex) {
  return knex('Categories').insert([
    {
      //id: 1,
      Category: 'BBQ'
    },
    {
      //id: 2,
      Category: 'Picnic'
    },
    {
      //id: 3,
      Category: 'Wine & Cheese'
    },
    {
      //id: 4,
      Category: 'Multi-course meal'
    },
    {
      //id: 5,
      Category: 'Sunday Sports'
    },
    {
      //id: 6,
      Category: 'Kids\' Play Date'
    },
    {
      //id: 7,
      Category: 'Puppy Play Date'
    },
    {
      //id: 8,
      Category: 'Cat Play Date'
    },
  ]);
};
