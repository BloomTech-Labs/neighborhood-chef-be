exports.seed = function(knex) {
    return knex('MeasurementTypes').insert([
        {
            //id: 1,
            name: 'Volume',
        },
        {
            //id: 2,
            name: 'Weight/Mass',
        },
        {
            //id: 3,
            name: 'Length',
        },
        {
            //id: 4,
            name: 'Temperature',
        },
    ]);
};
