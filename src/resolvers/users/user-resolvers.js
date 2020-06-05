const userModel = require("../../models/users/user-models.js");
const eventModel = require("../../models/events/event-models.js");
const { AuthenticationError } = require("apollo-server-express");
const { stringifyPhoto } = require("../events/event-resolvers.js");

const status = async (_, __, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  return "Apollo Server is Running!";
};

const getAllUsers = async (_, __, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const userList = await userModel.find();
  const allUserEvents = userList.map(async (user) => {
    const owned = await eventModel.findBy({ user_id: user.id });
    const events = owned.map(async event => {
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

const getUserById = async (_, args, context) => {
  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    // favorite events with users
    const favorites = await userModel.findAllFavoriteEvents(args.id);
    const favoritesWithUsers = favorites.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    })
    //events owned with users
    const owned = await eventModel.findBy({ user_id: args.id });
    const ownedWithUsers = owned.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    });
    // final object returned
    return {
      ...user,
      eventsOwned: [...ownedWithUsers],
      favoriteEvents: [...favoritesWithUsers]
    };

  } else {
    throw new Error("The specified user id does not exist");
  }
};

const getUserByEmail = async (_, args, context) => {
  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findBy({ email: args.input.email }).first();
  if (user) {
    // favorite events with users
    const favorites = await userModel.findAllFavoriteEvents(user.id);
    const favoritesWithUsers = favorites.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    })
    //events owned with users
    const owned = await eventModel.findBy({ user_id: user.id });
    const ownedWithUsers = owned.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      return {
        ...event,
        users: [...users]
      }
    });
    // final object returned
    return {
      ...user,
      eventsOwned: [...ownedWithUsers],
      favoriteEvents: [...favoritesWithUsers]
    };

  } else {
    throw new Error("The specified user email does not exist");
  }
};

const getAuthoredEvents = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findBy({ user_id: args.id });
    const data = events.map(async (event) => {
      const users = await eventModel.findUsersForEvent(event.id);

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

const getInvitedEvents = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findInvitedEvents(args.id);
    const invited = events.map(async event => {
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

const getAttendingEvents = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (user) {
    const events = await eventModel.findAttendingEvents(args.id);
    const attending = events.map(async event => {
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

const addUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const existing = await userModel.findBy({ email: args.input.email }).first();
  if (existing) {
    throw new Error("email already taken");
  } else {
    return await userModel.add(args.input);
  }
};

const updateUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const found = await userModel.findById(args.id);
  if (found) {
    return await userModel.update(args.id, args.input);
  } else {
    throw new Error("The specified user id does not exist");
  }
};

const removeUser = async (_, args, context) => {

  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id);
  if (!user) {
    throw new Error("The specified user id does not exist");
  } else {
    await userModel.remove(args.id);
    return user;
  }
};

const addFavoriteEvent = async (_, args, context) => {
  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.input.user_id);
  const event = await eventModel.findById(args.input.event_id);
  const duplicate = await userModel.findIfAlreadyFavorite(args.input);


  if (user && event && !duplicate) {
    // add favorite event and return full array of favorite events with users
    const favorites = await userModel.addFavoriteEvent(args.input);
    const favoriteWithUsers = await favorites.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      stringifyPhoto(event);
      return {
        ...event,
        users: [...users]
      }
    });

    return favoriteWithUsers;
  } else {
    throw new Error("Specified user id or event id does not exist or event is already a favorite");
  }
};

const removeFavoriteEvent = async (_, args, context) => {
  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const isFavorite = await userModel.findIfAlreadyFavorite(args.input);
  if (isFavorite) {
    // remove event and return full array of favorite events with users
    await userModel.removeFavoriteEvent(args.input);
    const favorites = await userModel.findAllFavoriteEvents(args.input.user_id);
    const favoriteWithUsers = await favorites.map(async event => {
      const users = await eventModel.findUsersForEvent(event.id);
      stringifyPhoto(event);
      return {
        ...event,
        users: [...users]
      }
    });

    return favoriteWithUsers;
  } else {
    throw new Error("There is no favorite event for the specified user id and event id")
  };
};

const getFavoriteEvents = async (_, args, context) => {
  const authenticated = await context.authenticated
  if (!authenticated.success) throw new AuthenticationError(`AUTHENTICATION FAILED ${authenticated.error}`);

  const user = await userModel.findById(args.id)
  if (user) {
    const favoriteEvents = await userModel.findAllFavoriteEvents(args.id);
    const favoritesWithUsers = favoriteEvents.map(async (event) => {
      const users = await eventModel.findUsersForEvent(event.id);
      stringifyPhoto(event);
      return {
        ...event,
        users: [...users],
      }
    });
    return favoritesWithUsers;
  } else {
    throw new Error("Specified user id does not exist")
  }
};



module.exports = {
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
};
