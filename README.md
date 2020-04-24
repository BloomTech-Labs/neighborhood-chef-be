# API Documentation

#### 1️⃣ Backend delpoyed at [AWS RDS](https://master.d3oqswdfi1a994.amplifyapp.com/) <br>

[![Maintainability](https://api.codeclimate.com/v1/badges/217cf613842592864005/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/217cf613842592864005/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/test_coverage)

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment
- **yarn test:watch** to continously use testing environment
- **yarn test:watch:troubleshoot** to debug while using testing environment
- **yarn test:watch:withLogs** to view logs while using testing environment
- **yarn test:coverage** to view test coverage

### Backend framework

- Node
- Express
- Graphql
- Knex
- AWS RDS
- PostgreSQL

## 2️⃣ Graphql Queries and Mutations

#### User

| Type     | Name        | variables                          | Description            |
| -------- | ----------- | ---------------------------------- | ---------------------- |
| Query    | getAllUsers | none                               | Returns all users      |
| Query    | getUserById | (id: ID!)                          | Returns a single user  |
| Mutation | addUser     | (input: NewUserInput!)             | Adds a user account    |
| Mutation | updateUser  | (id: ID!, input: UpdateUserInput!) | Updates a user account |
| Mutation | removeUser  | (id: ID!)                          | Deletes a user account |

#### Event

| Type     | Name              | variables                           | Description                     |
| -------- | ----------------- | ----------------------------------- | ------------------------------- |
| Query    | getAllEvents      | none                                | Returns all events              |
| Query    | getAuthoredEvents | (id: ID!)                           | Returns logged in user's events |
| Query    | getEventById      | (id: ID!)                           | Returns a single event          |
| Mutation | addEvent          | (input: NewEventInput!)             | Adds a new event                |
| Mutation | updateEvent       | (id: ID!, input: UpdateEventInput!) | Updates an event                |
| Mutation | removeEvent       | (id: ID!)                           | Deletes an event                |

#### Category

| Type     | Name            | variables                  | Description               |
| -------- | --------------- | -------------------------- | ------------------------- |
| Query    | getCategories   | none                       | Returns all categories    |
| Query    | getCategoryById | (id: ID!)                  | Returns a single category |
| Mutation | addCategory     | (input: NewCategoryInput!) | Adds a new category       |

# Data Model

#### 2️⃣ User Type and Inputs

---

```
  type User {
    id: ID!
    Email: String!
    Password: String!
    FirstName: String!
    LastName: String!
    Gender: String
    Address: String!
    Latitude: Float!
    Longitude: Float!
    Photo: String
    Events_Owned: [Event]!
    Events_Invited: [Event]!
    Events_Attending: [Event]!
  }
```

```
  input NewUserInput {
    id: ID
    Email: String!
    Password: String!
    FirstName: String!
    LastName: String!
    Gender: String
    Address: String!
    Latitude: Float!
    Longitude: Float!
    Photo: String
  }
```

```
  input UpdateUserInput {
    id: ID
    Email: String
    Password: String
    FirstName: String
    LastName: String
    Gender: String
    Address: String
    Latitude: Float
    Longitude: Float
    Photo: String
  }
```

#### Event Type and Inputs

---

```
  type Event {
    id: ID!
    Date: String!
    Start_Time: String!
    End_Time: String
    Title: String!
    Description: String!
    Photo: String!
    category_id: Int!
    user_id: Int!
    Modifiers: String!
    Address: String!
    Latitude: Float!
    Longitude: Float!
  }
```

```
  input NewEventInput {
    id: ID
    Date: String!
    Start_Time: String!
    End_Time: String
    Title: String!
    Description: String!
    user_id: Int!
    Photo: String
    category_id: Int!
    Modifiers: String
    Address: String!
    Latitude: Float!
    Longitude: Float!
  }
```

```
  input UpdateEventInput {
    id: ID
    Date: String
    Start_Time: String
    End_Time: String
    Title: String
    Description: String
    Photo: String
    category_id: Int
    user_id: Int
    Modifiers: String
    Address: String
    Latitude: Float
    Longitude: Float
  }
```

#### Category Type

---

```
  type Category {
    id: ID!
    Category: String!
  }
```

```
  input NewCategoryInput {
    id: ID
    Category: String!
  }
```

## 2️⃣ Actions

`query getAllUsers` -> Returns all users

`query getUserById(id: ID!)` -> Returns a single user by ID

`mutation addUser(input: NewUserInput!)` -> Returns a created user

`mutation updateUser(id: ID!, input: UpdateUserInput!)` -> Update a user by ID

`mutation removeUser(id: ID!)` -> Delete a user by ID
<br>
<br>
<br>

`query getAllEvents` -> Returns all events

`query getAuthoredEvents(id: ID!)` -> Returns all events from user by his/her user id

`query getEventById(id: ID!)` -> Returns a single event by event id

`mutation addEvent(input: NewEventInput!)` --> Creates a new event and returns that event

`mutation updateEvent(id: ID!, input: UpdateEventInput!)` -> Updates a single event by ID

`mutation deleteEvent(id: ID!)` -> deletes a sinlge event by id
<br>
<br>
<br>

`query getAllCategories` -> Returns all categories

`query getCategoryById(id: ID!)` -> Returns a single category by category id

`mutation addCategory(input: NewCategoryInput!)` -> Creates a new category and returns that category

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

_ NODE_ENV - set to "development" until ready for "production"
_ PORT - set your local port of choice

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/neighborhood-chef-fe/blob/master/README.md) for details on the fronend of our project.
