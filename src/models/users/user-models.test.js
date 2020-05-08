let userModel = require('./user-models.js');
let eventModel = require('../events/event-models.js');
const db = require('../../../data/dbConfig.js');

const newUser = {
  email: String(Math.random()),
  password: 'secretpassword',
  firstName: 'John',
  lastName: 'Doe',
  address: '1234 New York St.',
  gender: 'Male',
  latitude: 41.252,
  longitude: -1.94812,
};

describe('user models', () => {
  let createdUserId;

  test('creates a user', async () => {
    const added = await userModel.add(newUser);
    createdUserId = added.id;
    const found = await db('Users').where({ id: createdUserId }).first();
    expect(found.firstName).toEqual('John');
  });

  test('gets all users', async () => {
    const users = await userModel.find();
    expect(users.length).toBeGreaterThan(0);
  });

  test('gets new user by id', async () => {
    const user = await userModel.findById(createdUserId);
    expect(user.lastName).toEqual('Doe');
  });

  test('user updates', async () => {
    const user = await userModel.update(createdUserId, {
      firstName: 'Jane',
      gender: 'Female',
    });
    expect(user.firstName).toEqual('Jane');
    expect(user.gender).toEqual('Female');
  });

  test('created user has zero invited events', async () => {
    const invitedEvents = await eventModel.findInvitedEvents(createdUserId);
    expect(invitedEvents.length).toEqual(0);
  });

  test('created user is attending zero events', async () => {
    const attending = await eventModel.findAttendingEvents(createdUserId);
    expect(attending.length).toEqual(0);
  });

  test('created user is deleted', async () => {
    const deleted = await userModel.remove(createdUserId);
    const user = await db('Users').where({ id: createdUserId }).first();
    expect(user).toBeUndefined();
  });
});
