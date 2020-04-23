const supertest = require("supertest");
const server = require("../../server.js");
const db = require("../../models/users/user-models.js");

describe("user resolvers", () => {
  let testId;

  afterAll(async () => {
    await supertest(server)
      .post("/graphql")
      .send({
        query: `
          mutation removeUser($id: ID!) {
              removeUser(id: $id) {
                  id
              }
          }
      `,
        operationName: "removeUser",
        variables: { id: testId },
      });
  });

  test("gets all users", async () => {
    const users = await supertest(server).post("/graphql").send({
      query: `
            query getAllUsers {
                getAllUsers {
                    id
                }
            }
        `,
      operationName: "getAllUsers",
    });
    expect(users.status).toBe(200);
    expect(users.type).toEqual("application/json");
  });

  test("creates a new user", async () => {
    const created = await supertest(server)
      .post("/graphql")
      .send({
        query: `
            mutation addUser($input: NewUserInput!) {
                addUser(input:$input) {
                    id
                    Address
                }
            }
        `,
        operationName: "addUser",
        variables: {
          input: {
            Email: String(Math.random()),
            Password: "thisissecret",
            FirstName: "John",
            LastName: "Doe",
            Gender: "male",
            Latitude: 2.22,
            Longitude: -2.22,
            Address: "my house",
          },
        },
      });
    const parsed = JSON.parse(created.text);
    testId = parsed.data.addUser.id;
    expect(created.status).toBe(200);
    expect(parsed.data.addUser.Address).toEqual("my house");
  });

  //   test("removes created user", async () => {
  //     const removed = await supertest(server)
  //       .post("/graphql")
  //       .send({
  //         query: `
  //             mutation removeUser($id: ID!) {
  //                 removeUser(id: $id) {
  //                     id
  //                 }
  //             }
  //         `,
  //         operationName: "removeUser",
  //         variables: { id: testId },
  //       });
  //   });
});
