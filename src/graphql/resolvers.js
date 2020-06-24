const { GraphQLJSON } = require("graphql-type-json");

const {
  status,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getAuthoredEvents,
  getInvitedEvents,
  getAttendingEvents,
  addUser,
  updateUser,
  removeUser,
  addFavoriteEvent,
  removeFavoriteEvent,
  getFavoriteEvents
} = require("../resolvers/users/user-resolvers.js");

const {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  removeEvent,
  getUninvitedUsers,
  inviteUserToEvent,
  updateInvitation,
  removeInvitation,
} = require("../resolvers/events/event-resolvers.js");

const {
  getCategories,
  getCategoryById,
  addCategory,
} = require("../resolvers/categories/category-resolvers.js");

const {
  getIngredientsByEventId,
  addEventIngredients,
  EventIngredientUpdate,
  removeEventIngredient,
} = require('../resolvers/event-ingredients/event-ingredients-resolver');

const {
  getEventComments,
  addComment,
  updateComment,
  removeComment,
} = require("../resolvers/comments/comment-resolvers.js");

module.exports = {
  JSON: GraphQLJSON,
  Query: {
    status,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUninvitedUsers,
    getAuthoredEvents,
    getInvitedEvents,
    getAttendingEvents,
    getAllEvents,
    getEventById,
    getCategories,
    getCategoryById,
    getFavoriteEvents,
    getIngredientsByEventId,
    getEventComments,

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
    removeInvitation,
    addFavoriteEvent,
    removeFavoriteEvent,
    addEventIngredients,
    EventIngredientUpdate,
    removeEventIngredient,
    addComment,
    updateComment,
    removeComment,
  },
};
