const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getAllEvents = async () => {
  const eventList = await eventModel.find()
  const userList = eventList.map(async event => {
    const users = await eventModel.findUsersForEvent(event.id);
    stringify(event);
    return {
      ...event,
      users: [...users]
    }
  })
  const results = Promise.all(userList);
  return results;
};

const getEventById = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const users = await eventModel.findUsersForEvent(args.id);
    stringify(event);
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
    const events = await eventModel.findBy({ user_id: args.id });
    const data = events.map(async (event) => {
      stringify(event);
      return event;
    })
    return data;
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addEvent = async (_, args) => {
  const newEvent = await eventModel.add(args.input);
  stringify(newEvent)
  return newEvent;
};

const updateEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const updatedEvent = await eventModel.update(args.id, args.input);
    stringify(updatedEvent);
    return updatedEvent;
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const removeEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const removed = await eventModel.remove(args.id);
    stringify(event);
    return event;
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const inviteUserToEvent = async (_, args) => {
  const event = await eventModel.findById(args.input.event_id);
  const user = await userModel.findById(args.input.user_id);
  const duplicate = await eventModel.findIfUserIsAlreadyInvited(args.input)

  if (!event || !user || duplicate) {
    throw new Error("Either the specified event id or user id does not exist, or user is already invited");
  } else {
    return await eventModel.inviteUserToEvent(args.input);
  }
};

// helper function to convert hashtags and modifiers to strings
function stringify(event) {
  event.hashtags = JSON.stringify(event.hashtags);
  event.modifiers = JSON.stringify(event.modifiers);
  return event;
}

module.exports = {
  getAllEvents,
  getEventById,
  getAuthoredEvents,
  addEvent,
  updateEvent,
  removeEvent,
  inviteUserToEvent
};
