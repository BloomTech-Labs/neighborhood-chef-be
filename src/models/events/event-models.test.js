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
  Latitude: 12.222,
  Longitude: 2.2333,
};

const updatedEvent = {
  Date: new Date(),
  Start_Time: "6:45",
  End_Time: "11:30",
  Title: "BBQ Madness",
  category_id: 1,
  Address: "Your house",
  Latitude: 34.213,
  Longitude: 55.231,
};

describe("event models", () => {
  let createdEventId = 0;
  let eventCount = 0;

  beforeAll(async () => {
    eventCount = await (await db("Events")).length;
  });

  test("creates a new event", async () => {
    const created = await eventModels.add(newEvent);
    createdEventId = created.id;
    const events = await db("Events").select();
    expect(events.length).toEqual(eventCount + 1);
  });

  test("finds all events", async () => {
    const events = await eventModels.find();
    expect(events.length).toEqual(eventCount + 1);
  });

  test("finds event by id", async () => {
    const event = await eventModels.findById(createdEventId);
    expect(event.Title).toEqual("BBQ Madness");
  });

  test("event is updated", async () => {
    const updated = await eventModels.update(createdEventId, updatedEvent);
    expect(updated.Address).toEqual("Your house");
  });

  test("deletes created event", async () => {
    const removed = await eventModels.remove(createdEventId);
    const events = await db("Events").select();
    expect(events.length).toEqual(eventCount);
  });
});
