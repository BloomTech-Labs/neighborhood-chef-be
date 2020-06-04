const fs = require('fs');

var TriTipImageData = readImageFile('./data/images/tritip.jpg');
var RatatouilleImageData = readImageFile('./data/images/Ratatouille.jpg');

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
  return knex('Recipes').insert([
    {
      //id: 1,
      name: 'Smoked Tri-Tip Roast',
      description: 'You’ll want to pull out the smoker for this amazing smoked Tri-Tip recipe!',
      instructions: 'Blot the roast with a paper towel and season generously with salt and pepper or seasoning rub.\n\nLightly coat grates with vegetable oil spray. Close cooking chamber lids.\n\nPlace 3-5 lbs. of charcoal, in center of the firebox. Open the firebox air vent approximately 1-2″, and smokestack damper halfway. With firebox lid open, stand back, carefully light charcoal and allow to burn until covered with a light ash. (Approximately 20 minutes)\n\nOnce coals have ashed over, add wood chunks. Do not shut firebox lid until the smoke is clean, often called Blue Smoke.\n\nClose firebox lid. Adjust the firebox air vent and smokestack damper to regulate cooking temperature. The ideal smoking temperature is between 275°F-300°F.',
      servings: 8.00,
      photo: TriTipImageData,
      source: 'https://www.beeflovingtexans.com/recipe/smoked-tri-tip-roast/',
    },
    {
      //id: 2,
      name: 'Ratatouille',
      description: 'For a little spice, you can add either dried or fresh chiles (like Fresno, Thai, or red pepper flakes) to this classic ratatouille recipe.',
      instructions: 'Preheat oven to 400°. Toss eggplant, zucchini, and 2 tsp. salt in a colander. Let sit 30 minutes, then pat dry with paper towels.\n\nHeat ¼ cup oil in a large Dutch oven or other heavy ovenproof pot over medium-high. Add half of eggplant and zucchini and cook, stirring constantly, until vegetables begin to take on color, about 5 minutes. Transfer to a medium bowl. Repeat with ¼ cup oil and remaining eggplant and zucchini.\n\nTie thyme sprigs together with kitchen twine. Heat remaining ¼ cup oil in same pot and cook onion, bell pepper, garlic, and thyme, stirring occasionally, until onion is beginning to brown and is softened, 8–10 minutes. Add half of tomatoes and cook, stirring occasionally, until just beginning to soften, about 5 minutes. Stir in zucchini and eggplant, then top with remaining 1 pint tomatoes (do not stir); season with salt and pepper. Transfer pot to oven and roast until all vegetables are softened and tomatoes have begun to burst, 15–20 minutes.\n\nRemove thyme bundle. Transfer to a serving platter and top with basil.',
      servings: 4.00,
      photo: RatatouilleImageData,
      source: 'https://www.bonappetit.com/recipe/ratatouille-2',
    },
  ]);
};
