const userModel = require("../models/users/user-models.js");
const eventModel = require("../models/events/event-models.js");

const status = () => "Apollo Server is Running!";

const getAllUsers = async () => {
  return userModel.find();
};

const getUserById = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    return user;
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const addUser = async (_, args) => {
  const existing = await userModel.findBy({ Email: args.input.Email }).first();
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
    throw new UserInputError("The specified user id does not exist");
  }
};

const removeUser = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (!user) {
    throw new Error("The specified user id does not exist");
  } else {
    return userModel.remove(args.id);
  }
};

const getAllEvents = async () => {};

const getEventById = async (_, { id }) => {};

const getAuthoredEvents = async (_, { id }) => {};

const addEvent = async (_, args) => {
  return eventModel.add(args.input);
};

const updateEvent = async (_, { id, input }) => {};

const removeEvent = async (_, { id }) => {};

const getCategories = async () => {};

const getCategoryById = async (_, { id }) => {};

const addCategory = async (_, { input }) => {};

module.exports = {
  Query: {
    status,
    getAllUsers,
    getUserById,
    getAuthoredEvents,
    getAllEvents,
    getEventById,
    getCategories,
    getCategoryById,
  },
  Mutation: {
    addUser,
    updateUser,
    removeUser,
    addEvent,
    updateEvent,
    removeEvent,
    addCategory,
  },
};
