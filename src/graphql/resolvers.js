const {
  status,
  getAllUsers,
  getUserById,
  getAuthoredEvents,
  getInvitedEvents,
  getAttendingEvents,
  addUser,
  updateUser,
  removeUser,
} = require("../resolvers/users/user-resolvers.js");

const {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  removeEvent,
  inviteUserToEvent,
  updateInvitation,
  removeInvitation
} = require("../resolvers/events/event-resolvers.js");

const {
  getCategories,
  getCategoryById,
  addCategory,
} = require("../resolvers/categories/category-resolvers.js");

module.exports = {
  Query: {
    status,
    getAllUsers,
    getUserById,
    getAuthoredEvents,
    getInvitedEvents,
    getAttendingEvents,
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
    inviteUserToEvent,
    updateInvitation,
    removeInvitation
  },
};
