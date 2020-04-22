let userModel = require("./user-models.js");
const db = require("../../../data/dbConfig.js");

const newUser = {
  Email: String(Math.random()),
  Password: "secret",
  FirstName: "John",
  LastName: "Doe",
  Address: "Portland",
  Gender: "male",
  Latitude: "22.222",
  Longitude: "1.22",
};

const updatedUser = {
  Email: String(Math.random()),
  Password: "moreSecret",
  FirstName: "Jane",
  LastName: "Doe",
  Address: "Portland",
  Gender: "female",
  Latitude: "22.222",
  Longitude: "5.55",
};

describe("user models", () => {
  let createdUserId = 0;
  let userCount = 0;

  beforeAll(async () => {
    userCount = await (await db("Users")).length;
  });

  test("creates a user", async () => {
    const added = await userModel.add(newUser);
    createdUserId = added.id;
    const users = await db("Users");
    expect(users).toHaveLength(userCount + 1);
  });

  test("gets all users", async () => {
    const users = await userModel.find();
    expect(users).toBeDefined();
  });

  test("gets new user by id", async () => {
    const user = await userModel.findById(createdUserId);
    expect(user.FirstName).toEqual("John");
  });

  test("user updates", async () => {
    const user = await userModel.update(createdUserId, updatedUser);
    expect(user.FirstName).toEqual("Jane");
  });

  test("created user is deleted", async () => {
    const deleted = await userModel.remove(createdUserId);
    const users = await userModel.find();
    expect(users.length).toEqual(userCount);
  });
});
