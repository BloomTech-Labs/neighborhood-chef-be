const db = require("../../../data/dbConfig.js");
const eventModels = require("./event-models.js");

const newEvent = {
  Date: new Date(),
  Start_Time: "6:00pm",
  End_Time: "9:30pm",
  Title: "Homemade Pho and Banh Mi Night",
  Description:
    "Join us at our home for some homemade pho and banh mi sandwiches. Food will be provided, but please BYOB.",
  user_id: 1,
  category_id: 1,
  Address: "555 Ocean View Ln",
  Latitude: 34.39291,
  Longitude: -24.2333,
};

describe("event models", () => {
  let createdEventId;
  let initialEventCount;

  beforeAll(async () => {
    const events = await db("Events");
    initialEventCount = events.length;
  });

  test("creates a new event", async () => {
    const created = await eventModels.add(newEvent);
    createdEventId = created.id;
    const found = await db("Events").where({ id: createdEventId });
    expect(found).toBeDefined();
  });

  test("finds all events", async () => {
    const events = await eventModels.find();
    expect(events.length).toEqual(initialEventCount + 1);
  });

  test("finds event by id", async () => {
    const event = await eventModels.findById(createdEventId);
    expect(event.Title).toEqual("Homemade Pho and Banh Mi Night");
  });

  test("event is updated", async () => {
    const updated = await eventModels.update(createdEventId, {
      Address: "444 Ocean View Ln",
    });
    expect(updated.Address).toEqual("444 Ocean View Ln");
  });

  test("deletes created event", async () => {
    const removed = await eventModels.remove(createdEventId);
    const event = await db("Events").where({ id: createdEventId }).first();
    expect(event).toBeUndefined();
  });
});
