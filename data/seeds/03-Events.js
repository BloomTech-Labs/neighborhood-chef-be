const fs = require('fs');
const luxon = require('luxon');
const DateTime = luxon.DateTime;
const dt = DateTime.utc();

const dTodayPlus3DaysAt6pm = DateTime.fromObject({ hour: 18, zone: 'UTC' }).plus({ days: 4 });
// console.log('dTodayPlus3DaysAt6pm: ', dTodayPlus3DaysAt6pm.toString());
const dTodayPlus7DaysAt8pm = DateTime.fromObject({ hour: 20, zone: 'UTC' }).plus({ days: 7 });
// console.log('dTodayPlus7DaysAt8pm: ', dTodayPlus7DaysAt8pm.toString());
const dTodayPlus7DaysAt11pm = DateTime.fromObject({ hour: 23, zone: 'UTC' }).plus({ days: 7 });
// console.log('dTodayPlus7DaysAt11pm: ', dTodayPlus7DaysAt11pm.toString());

const readImageFile = (path) => {
  const data = fs.readFileSync(path, 'base64');
  const ext = path.split('.').pop();
  const formattedData = `data:image/${ext};base64,${data}`;
  return formattedData;
};

const TexasBBQimageData = readImageFile('./data/images/TexasBBQ.jpg');
const RamsayimageData = readImageFile('./data/images/Ramsay.jpg');


exports.seed = function (knex) {
  return knex('Events').insert([
    {
      //id: 1,
      createDateTime: dt,
      user_id: 1,
      startTime: dTodayPlus3DaysAt6pm,
      title: 'Texas-Style BBQ',
      description: 'Come \'on down y\'all for an old-fashioned Texas Bar-B-Que with all the fixin\'s!\n\nWe\'ve got Chicken, Ribs, Pulled-Pork, Hot Links, and, my personal favorite, Smoked Brisket, along with Corn-on-the-Cob, Texas Toast and Buttermilk Biscuits, Baked Beans, Potato Salad, Cole-Slaw, Collard Greens, Fried Okra, and several authentic sauces shipped in direct from the Lone Star State!',
      photo: TexasBBQimageData,
      category_id: 1,
      modifiers: {},
      hashtags: {},
      address: 'Djupebäcksgatan 15, 461 32 Trollhättan, Sweden',
      latitude: 58.284325,
      longitude: 12.295076,
      published: true,
      allergenWarnings: {},
      dietaryWarnings: {},
    },
    {
      //id: 2,
      createDateTime: dt,
      user_id: 2,
      startTime: dTodayPlus7DaysAt8pm,
      endTime: dTodayPlus7DaysAt11pm,
      title: 'Chef Ramsay Full Course French Dinner',
      description: 'Enjoy a full course meal prepared by the world-renown Celebrity Chef Gordon Ramsay in his flagship restaurant serving polished French dishes from carefully chosen ingredients.',
      photo: RamsayimageData,
      category_id: 4,
      modifiers: {},
      hashtags: {},
      address: '68 Royal Hospital Rd, Chelsea, London SW3 4HP, United Kingdom',
      latitude: 51.4854801,
      longitude: -0.1643167,
      published: true,
      allergenWarnings: {},
      dietaryWarnings: {},
    },
  ]);
};
