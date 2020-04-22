const db = require("../../../data/dbConfig.js");
const eventModels = require("./event-models.js");

const newEvent = {
  Date: new Date(),
  Start_Time: "6:00",
  End_Time: "9:30",
  Title: "BBQ Madness",
  Description: "I like ribs, so come over and eat ribs",
  user_id: 1,
  category_id: 1,
  Address: "My house",
  Latitude: "12.222",
  Longitude: "2.2333",
};

const updatedEvent = {
  Date: new Date(),
  Start_Time: "6:45",
  End_Time: "11:30",
  Title: "BBQ Madness",
  category_id: 1,
  Address: "Your house",
  Latitude: "34.213",
  Longitude: "55.231",
};

describe("event models", () => {
  let createdEventId = 0;
  let eventCount = 0;

  beforeAll(async () => {
    userCount = await (await db("Events")).length;
  });

  //   test("creates a new event", async () => {
  //     const event = await eventModels.add(newEvent);
  //     createdEventId = event.id;
  //     const events = await db("Events");
  //     expect(events).toHaveLength(eventCount + 1);
  //   });
  test("something", async () => {
    console.log("fake test");
  });
});
