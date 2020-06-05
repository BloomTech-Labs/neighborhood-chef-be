const fs = require('fs');

var saltImageData = readImageFile('./data/images/salt.webp');
var pepperImageData = readImageFile('./data/images/ground-black-pepper.png');
var tripTipImageData = readImageFile('./data/images/Tri-Tip_Denuded.jpg');
var EggplantImageData = readImageFile('./data/images/eggplant.jpg');
var ZucchiniImageData = readImageFile('./data/images/zucchini.png');
var OliveOilImageData = readImageFile('./data/images/olive_oil.jpg');
var ThymeImageData = readImageFile('./data/images/thyme.jpg');
var OnionsImageData = readImageFile('./data/images/onions.jpg');
var RedBellPepperImageData = readImageFile('./data/images/red_bell_pepper.jpg');
var GarlicImageData = readImageFile('./data/images/garlic.jpg');
var CherryTomatoesImageData = readImageFile('./data/images/Cherry-Tomato.jpg');
var BasilLeavesImageData = readImageFile('./data/images/basil_leaves.jpg');

function readImageFile(path) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return data;
        }
    });
};

exports.seed = function(knex) {
    return knex('Ingredients').insert([
        {
            //id: 1,
            ingredientType_id: 1,
            name: 'Salt',
            description: 'Kosher Salt',
            photo: saltImageData,
        },
        {
            //id: 2,
            ingredientType_id: 1,
            name: 'Pepper',
            description: 'Ground Black Pepper',
            photo: pepperImageData,
        },
        {
            //id: 3,
            ingredientType_id: 2,
            name: 'Tri-Tip',
            description: 'Tri-Tip Beef Roast',
            photo: tripTipImageData,
        },
        {
            //id: 4,
            ingredientType_id: 3,
            name: 'Eggplant',
            description: 'Globe Eggplant',
            photo: EggplantImageData,
        },
        {
            //id: 5,
            ingredientType_id: 3,
            name: 'Zucchini',
            description: 'Zucchini',
            photo: ZucchiniImageData,
        },
        {
            //id: 6,
            ingredientType_id: 8,
            name: 'Olive Oil',
            description: 'Olive Oil',
            photo: OliveOilImageData,
        },
        {
            //id: 7,
            ingredientType_id: 9,
            name: 'Thyme',
            description: 'Thyme',
            photo: ThymeImageData,
        },
        {
            //id: 8,
            ingredientType_id: 3,
            name: 'Onion',
            description: 'Onion',
            photo: OnionsImageData,
        },
        {
            //id: 9,
            ingredientType_id: 3,
            name: 'Red Bell Pepper',
            description: 'Red Bell Pepper',
            photo: RedBellPepperImageData,
        },
        {
            //id: 10,
            ingredientType_id: 3,
            name: 'Garlic',
            description: 'Garlic Cloves',
            photo: GarlicImageData,
        },
        {
            //id: 11,
            ingredientType_id: 4,
            name: 'Cherry Tomatoes',
            description: 'Cherry Tomatoes',
            photo: CherryTomatoesImageData,
        },
        {
            //id: 12,
            ingredientType_id: 9,
            name: 'Basil',
            description: 'Basil Leaves',
            photo: BasilLeavesImageData,
        },
    ]);
};
