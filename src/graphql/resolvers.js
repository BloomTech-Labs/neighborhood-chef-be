const userModel = require("../models/users/user-models.js");
const eventModel = require("../models/events/event-models.js");
const categoryModel = require("../models/categories/category-models.js");

const status = () => "Apollo Server is Running!";

const getAllUsers = async () => {
  const userList = await userModel.find();
  const data = userList.map(async (user) => {
    const event = await eventModel.findBy({ user_id: user.id });
    return {
      ...user,
      Events_Owned: [...event],
    };
  });
  const results = await Promise.all(data);
  return [...results];
};

const getUserById = async (_, args) => {
  const user = await userModel.findById(args.id);
  if (user) {
    const owned = await eventModel.find({ user_id: args.id });
    return {
      ...user,
      Events_Owned: [...owned],
    };
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

const getAuthoredEvents = (_, { id }) => {
  //return eventModel.findBy({ user_id: id });
};

const addEvent = (_, args) => {
  return eventModel.add(args.input);
};

const updateEvent = async (_, { id, input }) => {};

const removeEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    return await eventModel.remove(args.id);
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const getCategories = async () => {
  return categoryModel.find();
};

const getCategoryById = async (_, args) => {
  const category = await categoryModel.findById(args.id);
  if (category) {
    return category;
  } else {
    throw new Error("The specified category id does not exist");
  }
};

const addCategory = (_, args) => {
  return categoryModel.add(args.input);
};

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
