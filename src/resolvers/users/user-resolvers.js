const userModel = require("../../models/users/user-models.js");
const eventModel = require("../../models/events/event-models.js");

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
    throw new Error("The specified user id does not exist");
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

module.exports = {
  status,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
