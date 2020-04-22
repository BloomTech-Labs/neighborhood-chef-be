const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    Email: String!
    Password: String!
    FirstName: String!
    LastName: String!
    Gender: String!
    Address: String!
    Latitude: Float!
    Longitude: String!
    Photo: String
    Events_Owned: [Event]!
    Events_Invited: [Event]!
    Events_Attending: [Event]!
  }

  input NewUserInput {
    id: ID
    Email: String!
    Password: String!
    FirstName: String!
    LastName: String!
    Gender: String!
    Address: String!
    Latitude: String!
    Longitude: String!
    Photo: String
  }

  input UpdateUserInput {
    id: ID
    Email: String
    Password: String
    FirstName: String
    LastName: String
    Gender: String
    Address: String
    Latitude: Int
    Longitude: Int
    Photo: String
  }

  type Event {
    id: ID!
    Date: String!
    Start_Time: Int!
    End_Time: Int!
    Title: String!
    Description: String!
    Photo: String!
    Category_id: Int!
    Modifiers: String!
    Address: String!
    Latitude: Int!
    Longitude: Int!
  }

  input NewEventInput {
    id: ID!
    Date: String!
    Start_Time: Int!
    End_Time: Int!
    Title: String!
    Description: String!
    Photo: String!
    Category_id: Int!
    Modifiers: String!
    Address: String!
    Latitude: Int!
    Longitude: Int!
  }

  input UpdateEventInput {
    id: ID
    Date: String
    Start_Time: Int
    End_Time: Int
    Title: String
    Description: String
    Photo: String
    Category_id: Int
    Modifiers: String
    Address: String
    Latitude: Int
    Longitude: Int
  }

  type Category {
    id: ID!
    Category: String!
  }

  input NewCategoryInput {
    id: ID!
    Category: String!
  }

  type Query {
    status: String!
    getAllUsers: [User]!
    getUserById(id: ID!): User!
    getAuthoredEvents(id: ID!): [Event]
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
  }
`;

module.exports = typeDefs;
