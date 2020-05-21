const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    gender: String
    address: String!
    latitude: Float!
    longitude: Float!
    photo: String
    eventsOwned: [Event]!
    status: String
  }

  input NewUserInput {
    id: ID
    email: String!
    firstName: String!
    lastName: String!
    gender: String
    address: String!
    latitude: Float!
    longitude: Float!
    photo: String
  }

  input UpdateUserInput {
    id: ID
    email: String
    firstName: String
    lastName: String
    gender: String
    address: String
    latitude: Float
    longitude: Float
    photo: String
  }

  input UserEmailInput {
    email: String!
  }

  type Event {
    id: ID!
    date: String!
    startTime: String!
    endTime: String
    createDateTime: String!
    title: String!
    description: String!
    photo: String!
    category_id: Int!
    user_id: Int!
    modifiers: String!
    hashtags: String!
    address: String!
    latitude: Float!
    longitude: Float!
    users: [User!]
  }

  input NewEventInput {
    id: ID
    date: String!
    startTime: String!
    endTime: String
    title: String!
    description: String!
    user_id: Int!
    photo: String
    category_id: Int!
    modifiers: String
    hashtags: String
    address: String!
    latitude: Float!
    longitude: Float!
  }

  input UpdateEventInput {
    id: ID
    date: String
    startTime: String
    endTime: String
    title: String
    description: String
    photo: String
    category_id: Int
    user_id: Int
    modifiers: String
    hashtags: String
    address: String
    latitude: Float
    longitude: Float
  }

  type Category {
    id: ID!
    category: String!
  }

  input NewCategoryInput {
    id: ID
    category: String!
  }

  input EventInviteInput {
    event_id: Int!
    user_id: Int!
    inviter_id: Int!
    status: String!
  }

  input UpdateInviteInput {
    event_id: Int!
    user_id: Int!
    status: String!
  }

  input RemoveInviteInput {
    event_id: Int!
    user_id: Int!
  }

  type Query {
    status: String!
    getAllUsers: [User]!
    getUserById(id: ID!): User!
    getUserByEmail(input: UserEmailInput!): User!
    getAuthoredEvents(id: ID!): [Event]!
    getUninvitedUsers(id: ID!): [User]!
    getInvitedEvents(id: ID!): [Event]!
    getAttendingEvents(id: ID!): [Event]!
    getAllEvents: [Event]!
    getEventById(id: ID!): Event!
    getCategories: [Category]!
    getCategoryById(id: ID!): Category!
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeUser(id: ID!): User!
    addEvent(input: NewEventInput!): Event!
    updateEvent(id: ID!, input: UpdateEventInput!): Event!
    removeEvent(id: ID!): Event!
    addCategory(input: NewCategoryInput!): Category!
    inviteUserToEvent(input: EventInviteInput!): Event!
    updateInvitation(input: UpdateInviteInput!): Event!
    removeInvitation(input: RemoveInviteInput!): Event!
  }
`;

module.exports = typeDefs;
