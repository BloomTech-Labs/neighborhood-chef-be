const supertest = require('supertest');
const server = require('../../server.js');
const db = require('../../../data/dbConfig.js');

const NEW_USER = {
  query: `
      mutation addUser($input: NewUserInput!) {
          addUser(input:$input) {
              id
              Address
          }
      }
  `,
  operationName: 'addUser',
  variables: {
    input: {
      Email: String(Math.random()),
      Password: 'supersecret',
      FirstName: 'John',
      LastName: 'Doe',
      Gender: 'Male',
      Latitude: -22.1542,
      Longitude: 10.2289,
      Address: '12345 ABC St.',
    },
  },
};

describe('user resolvers', () => {
  let testId;

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

  test('creates a new user', async () => {
    const created = await supertest(server).post('/graphql').send(NEW_USER);
    const parsed = JSON.parse(created.text);
    testId = parsed.data.addUser.id;
    expect(created.status).toBe(200);
    expect(parsed.data.addUser.Address).toEqual('12345 ABC St.');
  });

  test('finds user by id', async () => {
    const user = await supertest(server)
      .post('/graphql')
      .send({
        query: `
          query getUserById($id: ID!) {
            getUserById(id:$id) {
              id
              FirstName
            }
        }
      `,
        operationName: 'getUserById',
        variables: { id: testId },
      });
    const parsed = JSON.parse(user.text);
    expect(user.status).toBe(200);
    expect(parsed.data.getUserById.FirstName).toEqual('John');
  });

  test('user is updated', async () => {
    const updated = await supertest(server)
      .post('/graphql')
      .send({
        query: `
      mutation updateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
          id
          FirstName
      }
    }
      `,
        operationName: 'updateUser',
        variables: {
          id: testId,
          input: {
            FirstName: 'Jane',
          },
        },
      });
    const parsed = JSON.parse(updated.text);
    expect(updated.status).toBe(200);
    expect(parsed.data.updateUser.FirstName).toEqual('Jane');
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
