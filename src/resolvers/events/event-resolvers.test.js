const supertest = require('supertest');
const server = require('../../server.js');
const db = require('../../../data/dbConfig.js');

const ALL_EVENTS = {
  query: `
        query getAllEvents {
            getAllEvents {
                id
                title
            }
        }
    `,
  operationName: 'getAllEvents',
};

const NEW_EVENT = {
  query: `
        mutation addEvent($input: NewEventInput!) {
            addEvent(input: $input) {
                id,
                title
            }
        }
    `,
  operationName: 'addEvent',
  variables: {
    input: {
      createDateTime: '2020-05-29T12:00:00.000Z',
      startTime: '2020-05-31T18:00:00.000Z',
      title: 'Sushi and Sake Night',
      user_id: 1,
      description:
        'Come watch me learn how to make sushi for the first time and taste the finished product. Sake and an assortment of Japanese beers will be provided.',
      category_id: 1,
      address: '555 Hollywood Blvd',
      latitude: -42.3932,
      longitude: 102.23,
    },
  },
};

describe('event resolvers', () => {
  let testId;

  test('creates an event', async () => {
    const created = await supertest(server).post('/graphql').send(NEW_EVENT);
    const parsed = JSON.parse(created.text);
    testId = parsed.data.addEvent.id;
    expect(created.status).toBe(200);
    expect(created.type).toBe('application/json');
    expect(parsed.data.addEvent.title).toEqual('Sushi and Sake Night');
  });

  test('gets all events', async () => {
    const res = await supertest(server).post('/graphql').send(ALL_EVENTS);
    const parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(parsed.data.getAllEvents).toBeDefined();
  });

  test('finds event by id', async () => {
    const event = await supertest(server)
      .post('/graphql')
      .send({
        query: `
            query getEventById($id: ID!){
                getEventById(id: $id) {
                    address
                }
            }
        `,
        operationName: 'getEventById',
        variables: {
          id: `${testId}`,
        },
      });
    const parsed = JSON.parse(event.text);
    expect(event.status).toBe(200);
    expect(parsed.data.getEventById.address).toEqual('555 Hollywood Blvd');
  });

  test('event is updated', async () => {
    const updated = await supertest(server)
      .post('/graphql')
      .send({
        query: `
            mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
                updateEvent(id: $id, input: $input){
                    id
                    title
                }
            }
          `,
        operationName: 'updateEvent',
        variables: {
          id: `${testId}`,
          input: { title: 'Sushi and Beer Night' },
        },
      });
    const parsed = JSON.parse(updated.text);
    expect(updated.status).toBe(200);
    expect(parsed.data.updateEvent.title).toEqual('Sushi and Beer Night');
  });

  test('created event is deleted', async () => {
    const removed = await supertest(server)
      .post('/graphql')
      .send({
        query: `
          mutation removeEvent($id: ID!) {
              removeEvent(id: $id) {
                  id
              }
          }
        `,
        operationName: 'removeEvent',
        variables: { id: `${testId}` },
      });
    const search = await db('Events').where({ 'Events.id': testId }).first();
    expect(search).toBeUndefined();
  });
});
