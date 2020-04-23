const supertest = require("supertest");
const server = require("../../server.js");

const ALL_EVENTS = {
  query: `
        query getAllEvents {
            getAllEvents {
                id
                Title
            }
        }
    `,
  operationName: "getAllEvents",
};

const NEW_EVENT = {
  query: `
        mutation addEvent($input: NewEventInput!) {
            addEvent(input: $input) {
                id,
                Title
            }
        }
    `,
  operationName: "addEvent",
  variables: {
    input: {
      Date: "Dec 12, 2021",
      Start_Time: "6:30",
      Title: "Sushi and Sake Night",
      user_id: 1,
      Description: "Come to my place for tasy eats and drinks!",
      category_id: 1,
      Address: "Portland",
      Latitude: 2.233,
      Longitude: -2.23,
    },
  },
};

describe("event resolvers", () => {
  let testId;

  afterAll(async () => {
    await supertest(server)
      .post("/graphql")
      .send({
        query: `
            mutation removeEvent($id: ID!) {
                removeEvent(id: $id) {
                    id
                }
            }
          `,
        operationName: "removeEvent",
        variables: { id: `${testId}` },
      });
  });

  test("gets all events", async () => {
    const res = await supertest(server).post("/graphql").send(ALL_EVENTS);
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(parsed.data.getAllEvents).toBeDefined();
  });

  test("creates an event", async () => {
    const created = await supertest(server).post("/graphql").send(NEW_EVENT);
    const parsed = JSON.parse(created.text);
    testId = parsed.data.addEvent.id;
    expect(created.status).toBe(200);
    expect(created.type).toBe("application/json");
    expect(parsed.data.addEvent.Title).toEqual("Sushi and Sake Night");
  });

  test("finds event by id", async () => {
    const event = await supertest(server)
      .post("/graphql")
      .send({
        query: `
            query getEventById($id: ID!){
                getEventById(id: $id) {
                    Title
                }
            }
        `,
        operationName: "getEventById",
        variables: {
          id: `${testId}`,
        },
      });
    const parsed = JSON.parse(event.text);
    expect(event.status).toBe(200);
    expect(parsed.data.getEventById.Title).toEqual("Sushi and Sake Night");
  });

  test("event is updated", async () => {
    const updated = await supertest(server)
      .post("/graphql")
      .send({
        query: `
            mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
                updateEvent(id: $id, input: $input){
                    id 
                    Title
                }
            }
          `,
        operationName: "updateEvent",
        variables: {
          id: `${testId}`,
          input: { Title: "Sushi and Japenese Beer Night" },
        },
      });
    const parsed = JSON.parse(updated.text);
    expect(updated.status).toBe(200);
    expect(parsed.data.updateEvent.Title).toEqual(
      "Sushi and Japenese Beer Night"
    );
  });
});
