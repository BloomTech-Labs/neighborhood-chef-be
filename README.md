# API Documentation

#### 1️⃣ Backend deployed at [AWS RDS](https://master.d3oqswdfi1a994.amplifyapp.com/) <br>

[![Maintainability](https://api.codeclimate.com/v1/badges/e704a7d41bbcb50a6783/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e704a7d41bbcb50a6783/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/test_coverage)

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **Install Postgres Docker** (see section of same name) to setup PostgreSQL Docker development instance
- **yarn server** to start the local server
- **yarn test** to start server using testing environment
- **yarn test:watch** to continously use testing environment
- **yarn test:watch:troubleshoot** to debug while using testing environment
- **yarn test:watch:withLogs** to view logs while using testing environment
- **yarn test:coverage** to view test coverage

### Install Postgres Docker

First, ensure you've created a file named `/.env` with the same variable names as in the `/.env.example` file. The values can differ from the examples based on your preferred settings, if desired.

Next, ensure you have installed these pre-requisites:

On Windows, it's probably best to setup Windows Subsystem for Linux (WSL) and the Microsoft Terminal (preview) app from the Microsoft App Store. Instructions below for Ubuntu Linux can be followed in WSL if you use the Ubuntu instance.

- Docker Desktop and command line application (`docker`) in your path and available when issuing the command `docker`
  - Ubuntu Linux: `sudo apt install docker.io`
  - Windows/macOS: download & install Docker Desktop
- Postgres command line application (`psql`) in your path and available when issuing the command `psql`
  - Ubuntu Linux: `sudo apt install postgresql-client` (and its dependencies)
  - Windows/macOS: download PostgreSQL and install at minimum the command line application
- Knex command line application (`knex`) globally installed so that it is in your path and available when issuing the command `knex`
  - All (in terminal): `sudo yarn global add knex` or `sudo npm i -g knex`

Then, ensure the script has `execute` permission, and run the script in a Bash (Linux/WSL) or Zsh (macOS) Shell session:

`cd data; chmod +x postgres-docker.bash; ./postgres-docker.bash`

If prompted for a password, input your currently logged-in user's password to perform the requested command as superuser. This assumes your user has the privilege to do so as a "sudoer".

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

```json
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

```json
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

```json
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

```json
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

```json
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

```json
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

#### Category Type and Inputs

---

```json
  type Category {
    id: ID!
    Category: String!
  }
```

```json
  input NewCategoryInput {
    id: ID
    Category: String!
  }
```

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. Please refer to the .env.example file contained within the src folder for a list of up to date environment variables with examples.

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
