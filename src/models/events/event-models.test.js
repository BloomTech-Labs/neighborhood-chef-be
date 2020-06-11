const db = require('../../../data/dbConfig.js');
const eventModels = require('./event-models.js');

const newEvent = {
  createDateTime: '2020-05-29T12:00:00.000Z',
  startTime: '2020-05-31T18:00:00.000Z',
  endTime: '2020-05-31T22:00:00.000Z',
  title: 'Homemade Pho and Banh Mi Night',
  description:
    'Join us at our home for some homemade pho and banh mi sandwiches. Food will be provided, but please BYOB.',
  user_id: 1,
  category_id: 1,
  address: '555 Ocean View Ln',
  latitude: 34.39291,
  longitude: -24.2333,
};

describe('event models', () => {
  let createdEventId;

  test('creates a new event', async () => {
    const created = await eventModels.add(newEvent);
    createdEventId = created.id;
    const found = await db('Events').where({ id: createdEventId });
    expect(found).toBeDefined();
  });

  test('finds all events', async () => {
    const events = await eventModels.find();
    expect(events.length).toBeGreaterThan(0);
  });

  test('finds event by id', async () => {
    const event = await eventModels.findById(createdEventId);
    expect(event).toBeDefined();
    expect(event.title).toEqual('Homemade Pho and Banh Mi Night');
  });

  test('event is updated', async () => {
    const updated = await eventModels.update(createdEventId, {
      address: '444 Ocean View Ln',
      latitude: -34.392009,
    });
    expect(updated.address).toEqual('444 Ocean View Ln');
    expect(updated.latitude).toEqual('-34.392009');
  });

  test('deletes created event', async () => {
    const removed = await eventModels.remove(createdEventId);
    const event = await db('Events').where({ id: createdEventId }).first();
    expect(event).toBeUndefined();
  });
});
