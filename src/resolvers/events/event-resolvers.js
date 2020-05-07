const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getAllEvents = async () => {
  const eventList = await eventModel.find()
  const userList = eventList.map(async event => {
    const users = await eventModel.findUsersForEvent(event.id)
    return {
      ...event,
      users: [...users]
    }
  })
  const results = Promise.all(userList)
  return results;
};

const getEventById = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const users = await eventModel.findUsersForEvent(args.id)
    return {
      ...event,
      users: [...users]
    }
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const getAuthoredEvents = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    return await eventModel.findBy({ user_id: args.id });
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addEvent = (_, args) => {
  return eventModel.add(args.input);
};

const updateEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    return await eventModel.update(args.id, args.input);
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const removeEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    await eventModel.remove(args.id);
    return event;
  } else {
    throw new Error("The specified event id does not exist");
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  getAuthoredEvents,
  addEvent,
  updateEvent,
  removeEvent,
};
