const fs = require('fs');
const luxon = require('luxon');
const DateTime = luxon.DateTime;
const dt = DateTime.local();

let dTodayPlus3DaysAt6pm = DateTime.fromObject({hour: 18});
dTodayPlus3DaysAt6pm = dTodayPlus3DaysAt6pm.plus({days: 4});
// console.log('dTodayPlus3DaysAt6pm: ', dTodayPlus3DaysAt6pm.toString());
let dTodayPlus7DaysAt8pm = DateTime.fromObject({hour: 20});
dTodayPlus7DaysAt8pm = dTodayPlus7DaysAt8pm.plus({days: 7});
// console.log('dTodayPlus7DaysAt8pm: ', dTodayPlus7DaysAt8pm.toString());
let dTodayPlus7DaysAt11pm = DateTime.fromObject({hour: 23});
dTodayPlus7DaysAt11pm = dTodayPlus7DaysAt11pm.plus({days: 7});
// console.log('dTodayPlus7DaysAt11pm: ', dTodayPlus7DaysAt11pm.toString());

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
      date: dTodayPlus3DaysAt6pm.toLocaleString(DateTime.DATE_SHORT),
      startTime: dTodayPlus3DaysAt6pm.toLocaleString(DateTime.TIME_SIMPLE),
      title: 'Texas-Style BBQ',
      description: 'Come \'on down y\'all for an old-fashioned Texas Bar-B-Que with all the fixin\'s!\n\nWe\'ve got Chicken, Ribs, Pulled-Pork, Hot Links, and, my personal favorite, Smoked Brisket, along with Corn-on-the-Cob, Texas Toast and Buttermilk Biscuits, Baked Beans, Potato Salad, Cole-Slaw, Collard Greens, Fried Okra, and several authentic sauces shipped in direct from the Lone Star State!',
      photo: TexasBBQimageData,
      category_id: 1,
      modifiers: {},
      hashtags: {},
      address: 'Djupebäcksgatan 15, 461 32 Trollhättan, Sweden',
      latitude: 58.284325,
      longitude: 12.295076
    },
    {
      //id: 2,
      user_id: 2,
      date: dTodayPlus7DaysAt8pm.toLocaleString(DateTime.DATE_SHORT),
      startTime: dTodayPlus7DaysAt8pm.toLocaleString(DateTime.TIME_SIMPLE),
      endTime: dTodayPlus7DaysAt11pm.toLocaleString(DateTime.TIME_SIMPLE),
      title: 'Chef Ramsay Full Course French Dinner',
      description: 'Enjoy a full course meal prepared by the world-renown Celebrity Chef Gordon Ramsay in his flagship restaurant serving polished French dishes from carefully chosen ingredients.',
      photo: RamsayimageData,
      category_id: 4,
      modifiers: {},
      hashtags: {},
      address: '68 Royal Hospital Rd, Chelsea, London SW3 4HP, United Kingdom',
      latitude: 51.4854801,
      longitude: -0.1643167
    },
  ]);
};
