const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getAllEvents = (_, __, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  return eventModel.find();
};

const getEventById = async (_, args, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const event = await eventModel.findById(args.id);
  if (event) {
    return event;
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const getAuthoredEvents = async (_, args, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    return await eventModel.findBy({ user_id: args.id });
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addEvent = (_, args, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  return eventModel.add(args.input);
};

const updateEvent = async (_, args, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const event = await eventModel.findById(args.id);
  if (event) {
    return await eventModel.update(args.id, args.input);
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const removeEvent = async (_, args, context) => {

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

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
