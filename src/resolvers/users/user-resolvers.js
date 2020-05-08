const userModel = require("../../models/users/user-models.js");
const eventModel = require("../../models/events/event-models.js");
const { stringifyHashtagsAndMods } = require('../events/event-resolvers.js')

const status = () => "Apollo Server is Running!";

const getAllUsers = async () => {
  const userList = await userModel.find();
  const allUserEvents = userList.map(async (user) => {
    const owned = await eventModel.findBy({ user_id: user.id });
    const events = owned.map(async event => {
      await stringifyHashtagsAndMods(event)
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    })
    return {
      ...user,
      eventsOwned: [...events],
    };
  });
  const results = await Promise.all(allUserEvents);
  return [...results];
};

const getUserById = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findBy({ user_id: args.id });
    const data = events.map(async event => {
      await stringifyHashtagsAndMods(event)
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    })
    return {
      ...user,
      eventsOwned: [...data]
    };
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const getAuthoredEvents = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findBy({ user_id: args.id });
    const data = events.map(async (event) => {
      const users = await eventModel.findUsersForEvent(event.id);
      stringifyHashtagsAndMods(event);

      return {
        ...event,
        users: [...users]
      };
    })
    return data;
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const getInvitedEvents = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findInvitedEvents(args.id);
    const invited = events.map(async event => {
      stringifyHashtagsAndMods(event);
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    });
    return invited;
  } else {
    throw new Error("The specified user id does not exist")
  }
};

const getAttendingEvents = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findAttendingEvents(args.id);
    const attending = events.map(async event => {
      stringifyHashtagsAndMods(event);
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    });
    return attending;
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addUser = async (_, args) => {
  const existing = await userModel.findBy({ email: args.input.email }).first();
  if (existing) {
    throw new Error("email already taken");
  } else {
    return userModel.add(args.input);
  }
};

const updateUser = async (_, args, ___) => {
  const found = await userModel.findById(args.id);
  if (found) {
    return await userModel.update(args.id, args.input);
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const removeUser = async (_, args) => {
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
  getAuthoredEvents,
  getInvitedEvents,
  getAttendingEvents,
  addUser,
  updateUser,
  removeUser,
};
