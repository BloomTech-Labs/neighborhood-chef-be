const eventModel = require("../../models/events/event-models.js");

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

const getAuthoredEvents = (_, args) => {};

const addEvent = (_, args) => {
  return eventModel.add(args.input);
};

const updateEvent = async (_, args) => {
  const event = eventModel.findById(args.id);
  if (event) {
    return await eventModel.update(args.id, args.input);
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const removeEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    return await eventModel.remove(args.id);
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
