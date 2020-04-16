
const status = () => "Apollo Server is Running!";

const getAllUsers = async () => {
};

const getUserById = async (_, { id }) => {
   
};

const addUser = async (_, { input }) => {};

const updateUser = async (_, { id, input }, ___) => {};

const removeUser = async (_, { id }) => {};

const getAllEvents = async () => {};

const getEventById = async (_, { id }) => {};

const getAuthoredEvents = async (_, { id }) => {};

const addEvent = async (_, { input }) => {};

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
    getCategoryById
  },
  Mutation: {
    addUser,
    updateUser,
    removeUser,
    addEvent,
    updateEvent,
    removeEvent,
    addCategory,
  }
}