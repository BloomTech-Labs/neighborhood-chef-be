const eventModel = require("../../models/events/event-models.js");
const userModel = require("../../models/users/user-models.js");

const getAllEvents = async () => {
  const eventList = await eventModel.find();
  const userList = eventList.map(async (event) => {
    const users = await eventModel.findUsersForEvent(event.id);
    stringifyHashtagsAndMods(event);

    return {
      ...event,
      users: [...users],
    };
  });
  const results = Promise.all(userList);
  return results;
};

const getEventById = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const users = await eventModel.findUsersForEvent(args.id);
    stringifyHashtagsAndMods(event);

    return {
      ...event,
      users: [...users],
    };
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const addEvent = async (_, args) => {
  const newEvent = await eventModel.add(args.input);
  const invite = {
    event_id: newEvent.id,
    user_id: newEvent.user_id,
    inviter_id: newEvent.user_id,
    status: "Going",
  };
  const inviteOwner = await eventModel.inviteUserToEvent(invite);
  stringifyHashtagsAndMods(inviteOwner);
  return inviteOwner;
};

const updateEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    const updatedEvent = await eventModel.update(args.id, args.input);
    const users = await eventModel.findUsersForEvent(args.id);
    stringifyHashtagsAndMods(updatedEvent);
    return {
      ...updatedEvent,
      users: [...users],
    };
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const removeEvent = async (_, args) => {
  const event = await eventModel.findById(args.id);
  if (event) {
    await eventModel.remove(args.id);
    stringifyHashtagsAndMods(event);
    return event;
  } else {
    throw new Error("The specified event id does not exist");
  }
};

const inviteUserToEvent = async (_, args) => {
  isStatusValid(args.input.status);
  const event = await eventModel.findById(args.input.event_id);
  const user = await userModel.findById(args.input.user_id);
  const duplicate = await eventModel.findIfUserIsAlreadyInvited(args.input);

  if (!event || !user || duplicate) {
    throw new Error(
      "The specified event id or user id does not exist, or user is already invited"
    );
  } else {
    const invite = await eventModel.inviteUserToEvent(args.input);
    const users = await eventModel.findUsersForEvent(event.id);
    stringifyHashtagsAndMods(invite);

    return {
      ...invite,
      users: [...users],
    };
  }
};

const updateInvitation = async (_, args) => {
  isStatusValid(args.input.status);
  const invited = await eventModel.findIfUserIsAlreadyInvited(args.input);
  if (invited) {
    const updated = await eventModel.updateInvite(args.input);
    const users = await eventModel.findUsersForEvent(args.input.event_id);
    stringifyHashtagsAndMods(updated);

    return {
      ...updated,
      users: [...users],
    };
  } else {
    throw new Error(
      "There is no invitation for the specified user id and event id"
    );
  }
};

const removeInvitation = async (_, args) => {
  const isInvited = await eventModel.findIfUserIsAlreadyInvited(args.input);
  if (isInvited) {
    await eventModel.removeInvite(args.input);
    const event = await eventModel.findById(args.input.event_id);
    const users = await eventModel.findUsersForEvent(args.input.event_id);
    stringifyHashtagsAndMods(event);

    return {
      ...event,
      users: [...users],
    };
  } else {
    throw new Error(
      "There is no invitation for the specified user id and event id"
    );
  }
};

// helper functions
function stringifyHashtagsAndMods(event) {
  event.hashtags = JSON.stringify(event.hashtags);
  event.modifiers = JSON.stringify(event.modifiers);
  return event;
};

function isStatusValid(status) {
  if (
    status === "Not Approved" ||
    status === "Approved" ||
    status === "Not Going" ||
    status === "Maybe Going" ||
    status === "Going"
  ) {
    return;
  } else {
    throw new Error("Invalid status");
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  removeEvent,
  inviteUserToEvent,
  updateInvitation,
  removeInvitation,
  stringifyHashtagsAndMods,
};
