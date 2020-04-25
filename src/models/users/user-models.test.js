let userModel = require("./user-models.js");
let eventModel = require("../events/event-models.js");
const db = require("../../../data/dbConfig.js");

const newUser = {
  Email: String(Math.random()),
  Password: "secretpassword",
  FirstName: "John",
  LastName: "Doe",
  Address: "1234 New York St.",
  Gender: "Male",
  Latitude: 41.252,
  Longitude: -1.94812,
};

describe("user models", () => {
  let createdUserId;
  let initialUserCount;

  beforeAll(async () => {
    const users = await db("Users");
    initialUserCount = users.length;
  });

  test("creates a user", async () => {
    const added = await userModel.add(newUser);
    createdUserId = added.id;
    const found = await db("Users").where({ id: createdUserId }).first();
    expect(found.FirstName).toEqual("John");
  });

  test("gets all users", async () => {
    const users = await userModel.find();
    expect(users.length).toEqual(initialUserCount + 1);
  });

  test("gets new user by id", async () => {
    const user = await userModel.findById(createdUserId);
    expect(user.LastName).toEqual("Doe");
  });

  test("user updates", async () => {
    const user = await userModel.update(createdUserId, {
      FirstName: "Jane",
      Gender: "Female",
    });
    expect(user.FirstName).toEqual("Jane");
  });

  test("created user has zero invited events", async () => {
    const invitedEvents = await eventModel.findInvitedEvents(createdUserId);
    expect(invitedEvents.length).toEqual(0);
  });

  test("created user is attending zero events", async () => {
    const attending = await eventModel.findEventsAttending(createdUserId);
    expect(attending.length).toEqual(0);
  });

  test("created user is deleted", async () => {
    const deleted = await userModel.remove(createdUserId);
    const user = await db("Users").where({ id: createdUserId }).first();
    expect(user).toBeUndefined();
  });
});
