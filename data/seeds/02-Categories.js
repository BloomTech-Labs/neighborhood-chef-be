exports.seed = function(knex) {
  return knex('Categories').insert([
    {
      //id: 1,
      category: 'BBQ'
    },
    {
      //id: 2,
      category: 'Picnic'
    },
    {
      //id: 3,
      category: 'Wine & Cheese'
    },
    {
      //id: 4,
      category: 'Multi-course meal'
    },
    {
      //id: 5,
      category: 'Sunday Sports'
    },
    {
      //id: 6,
      category: 'Kids\' Play Date'
    },
    {
      //id: 7,
      category: 'Puppy Play Date'
    },
    {
      //id: 8,
      category: 'Cat Play Date'
    },
  ]);
};
