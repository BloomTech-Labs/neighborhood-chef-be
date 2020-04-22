const fs = require('fs');
const luxon = require('luxon');
const DateTime = luxon.DateTime;
const dt = DateTime.local();
const dTodayPlus3DaysAt6pm = DateTime.fromObject({day: dt.day+4, hour: 18});
const dTodayPlus7DaysAt8pm = DateTime.fromObject({day: dt.day+7, hour: 20});
const dTodayPlus7DaysAt11pm = DateTime.fromObject({day: dt.day+7, hour: 23});

var TexasBBQimageData = null;
fs.readFile('./data/TexasBBQ.jpg', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    TexasBBQimageData = data;
  }
});

var RamsayimageData = null;
fs.readFile('./data/Ramsay.jpg', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    RamsayimageData = data;
  }
});

exports.seed = function(knex) {
  return knex('Events').insert([
    {
      //id: 1,
      user_id: 1,
      Date: dTodayPlus3DaysAt6pm.toLocaleString(DateTime.DATE_SHORT),
      Start_Time: dTodayPlus3DaysAt6pm.toLocaleString(DateTime.TIME_SIMPLE),
      Title: 'Texas-Style BBQ',
      Description: 'Come \'on down y\'all for an old-fashioned Texas Bar-B-Que with all the fixin\'s!\n\nWe\'ve got Chicken, Ribs, Pulled-Pork, Hot Links, and, my personal favorite, Smoked Brisket, along with Corn-on-the-Cob, Texas Toast and Buttermilk Biscuits, Baked Beans, Potato Salad, Cole-Slaw, Collard Greens, Fried Okra, and several authentic sauces shipped in direct from the Lone Star State!',
      // Photo: 'https://chikonlineshop.com/wp-content/uploads/2019/10/gngnd.jpg',
      Photo: TexasBBQimageData,
      category_id: 1,
      Modifiers: {},
      Address: 'Djupebäcksgatan 15, 461 32 Trollhättan, Sweden',
      Latitude: 58.284325,
      Longitude: 12.295076
    },
    {
      //id: 2,
      user_id: 2,
      Date: dTodayPlus7DaysAt8pm.toLocaleString(DateTime.DATE_SHORT),
      Start_Time: dTodayPlus7DaysAt8pm.toLocaleString(DateTime.TIME_SIMPLE),
      End_Time: dTodayPlus7DaysAt11pm.toLocaleString(DateTime.TIME_SIMPLE),
      Title: 'Chef Ramsay Full Course French Dinner',
      Description: 'Enjoy a full course meal prepared by the world-renown Celebrity Chef Gordon Ramsay in his flagship restaurant serving polished French dishes from carefully chosen ingredients.',
      // Photo: 'https://i.pinimg.com/originals/85/b8/2f/85b82f59e4795623aa8742c83b9814d0.jpg',
      // Photo: 'https://www.gordonramsayrestaurants.com/assets/Uploads/_resampled/CroppedFocusedImage79040049-30-vb1561781-Restaurant-Gordon-Ramsay-017-AS-1-.jpg',
      Photo: RamsayimageData,
      category_id: 4,
      Modifiers: {},
      Address: '68 Royal Hospital Rd, Chelsea, London SW3 4HP, United Kingdom',
      Latitude: 51.4854801,
      Longitude: -0.1643167
    },
  ]);
};
