const userModel = require("../../models/users/user-models.js");
const eventModel = require("../../models/events/event-models.js");
const { AuthenticationError } = require("apollo-server-express");
;
const status = async (_, __, context) => { 

 const authenticated = await context.authenticated
 if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

 return  "Apollo Server is Running!";
}

const getAllUsers = async (_, __, context) => {

  const authenticated = await context.authenticated
  if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const userList = await userModel.find();
  const allUserEvents = userList.map(async (user) => {
    const owned = await eventModel.findBy({ user_id: user.id });
    const invited = await eventModel.findInvitedEvents(user.id);
    const attending = await eventModel.findEventsAttending(user.id);
    return {
      ...user,
      Events_Owned: [...owned],
      Events_Invited: [...invited],
      Events_Attending: [...attending],
    };
  });
  const results = await Promise.all(allUserEvents);
  return [...results];
};

const getUserById = async (_, args, context) => {

  const authenticated = await context.authenticated
  if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    const owned = await eventModel.findBy({ user_id: args.id });
    const invited = await eventModel.findInvitedEvents(args.id);
    const attending = await eventModel.findEventsAttending(args.id);
    return {
      ...user,
      Events_Owned: [...owned],
      Events_Invited: [...invited],
      Events_Attending: [...attending],
    };
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const existing = await userModel.findBy({ Email: args.input.Email }).first();
  if (existing) {
    throw new Error("email already taken");
  } else {
    return userModel.add(args.input);
  }
};

const updateUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const found = await userModel.findById(args.id);
  if (found) {
    return await userModel.update(args.id, args.input);
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const removeUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if(!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (!user) {
    throw new Error("The specified user id does not exist");
  } else {
    await userModel.remove(args.id);
    return user;
  }
};

module.exports = {
  status,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
