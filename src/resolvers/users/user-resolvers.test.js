const supertest = require('supertest');
const server = require('../../server.js');
const db = require('../../../data/dbConfig.js');

const NEW_USER = {
  query: `
        mutation addUser($input: NewUserInput!) {
          addUser(input:$input) {
              id
              address
          }
      }
  `,
  operationName: 'addUser',
  variables: {
    input: {
      email: String(Math.random()),
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      latitude: -22.1542,
      longitude: 10.2289,
      address: '12345 ABC St.'
    },
  },
};

describe('user resolvers', () => {
  let testId;

  test('creates a new user', async () => {
    const created = await supertest(server).post('/graphql').send(NEW_USER);
    const parsed = JSON.parse(created.text);
    testId = parsed.data.addUser.id;
    expect(created.status).toBe(200);
    expect(parsed.data.addUser.address).toEqual('12345 ABC St.');
  });

  test('gets all users', async () => {
    const users = await supertest(server).post('/graphql').send({
      query: `
            query getAllUsers {
                getAllUsers {
                    id
                }
            }
        `,
      operationName: 'getAllUsers',
    });
    expect(users.status).toBe(200);
    expect(users.type).toEqual('application/json');
  });

  test('finds user by id', async () => {
    const user = await supertest(server)
      .post('/graphql')
      .send({
        query: `
          query getUserById($id: ID!) {
            getUserById(id:$id) {
              id
              firstName
            }
        }
      `,
        operationName: 'getUserById',
        variables: { id: testId },
      });
    const parsed = JSON.parse(user.text);
    expect(user.status).toBe(200);
    expect(parsed.data.getUserById.firstName).toEqual('John');
  });

  test('user is updated', async () => {
    const updated = await supertest(server)
      .post('/graphql')
      .send({
        query: `
      mutation updateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
          id
          firstName
      }
    }
      `,
        operationName: 'updateUser',
        variables: {
          id: testId,
          input: {
            firstName: 'Jane',
          },
        },
      });
    const parsed = JSON.parse(updated.text);
    expect(updated.status).toBe(200);
    expect(parsed.data.updateUser.firstName).toEqual('Jane');
  });

  test('created user has zero favorited events', async () => {
    const favoriteEvents = await supertest(server)
      .post('/graphql')
      .send({
        query: `
        query getFavoriteEvents($id:ID!) {
          getFavoriteEvents(id:$id) {
            title
            description
          }
        }
      `,
        operationName: 'getFavoriteEvents',
        variables: { id: testId }
      });
    const parsed = JSON.parse(favoriteEvents.text);
    expect(favoriteEvents.status).toBe(200);
    expect(parsed.data.getFavoriteEvents.length).toEqual(0);
  });

  test('trying to favorite a non-existent event throws an error', async () => {
    const addFavorite = await supertest(server)
      .post('/graphql')
      .send({
        query: `
        mutation addFavoriteEvent($input: NewFavoriteEventInput!) {
          addFavoriteEvent(input: $input) {
            title
            description
          }
        }
      `,
        operationName: 'addFavoriteEvent',
        variables: {
          input: {
            user_id: parseInt(testId),
            event_id: 0
          }
        }
      });
    const parsed = JSON.parse(addFavorite.text);
    expect(parsed.data).toBe(null)
    expect(parsed.errors[0].message).toEqual('Specified user id or event id does not exist or event is already a favorite')
  });

  test('created user is deleted', async () => {
    const removed = await supertest(server)
      .post('/graphql')
      .send({
        query: `
        mutation removeUser($id: ID!) {
            removeUser(id: $id) {
                id
            }
        }
    `,
        operationName: 'removeUser',
        variables: { id: testId },
      });
    const search = await db('Users').where({ 'Users.id': testId }).first();
    expect(removed.status).toBe(200);
    expect(removed.type).toBe('application/json');
    expect(search).toBeUndefined();
  });
});
