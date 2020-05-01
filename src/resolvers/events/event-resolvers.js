const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getAllEvents = () => {
  return eventModel.find();
};

const getEventById = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    return event;
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
