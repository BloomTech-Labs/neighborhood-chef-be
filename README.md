# Neighborhood Chef

## Contributors

|                                                          [Kyle Richardson](https://github.com/kyle-richardson)                                                           |                                                       [Paul Edwards](https://github.com/PaulMEdwards)                                                        |                                                      [Aaron Merrifield-Lucier](https://github.com/Aaroneld)                                                       |                                                       [Brennan Neilson](https://github.com/bvneilson)                                                        |                                                      [Patrick Replogle](https://github.com/patrick-replogle)                                                       |                                                          [Miguel Leal](https://twitter.com/lealitos)                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars3.githubusercontent.com/u/52683176?s=400&u=864097615ff093d54d380d2d7d9d36bc0aebf60b&v=4" width = "200" />](https://github.com/kyle-richardson) | [<img src="https://avatars1.githubusercontent.com/u/153847?s=400&u=9ce092b1023143bff17fd34191c0768a1f8fe5ea&v=4" width = "200" />](https://github.com/PaulMEdwards) | [<img src="https://avatars2.githubusercontent.com/u/52682445?s=400&u=158e754213409df82f96c0f9f9a52821e9c81d1d&v=4" width = "200" />](https://github.com/Aaroneld) | [<img src="https://avatars3.githubusercontent.com/u/12500686?s=400&u=9ab949e147ba9fe8c58fe50a891c3daf8dcd21b4&v=4" width = "200" />](https://github.com/bvneilson) | [<img src="https://avatars2.githubusercontent.com/u/50844285?s=400&u=7ffa88c4c221bf888b1771fec72530ac156d90c6&v=4" width = "200" />](https://github.com/patrick-replogle) | [<img src="https://avatars3.githubusercontent.com/u/50895333?s=400&u=26d4e7b29f44be371e3dffec0aff81c960937093&v=4" width = "200" />](https://twitter.com/lealitos) |
|                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/kyle-richardson)                                       |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/PaulMEdwards)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Aaroneld)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/bvneilson)                           |                           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/patrick-replogle)                            |  [<img src="https://twitter.com/favicon.ico" width="15"> ](https://twitter.com/lealitos)                            |
|                      [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://linkedin.com/in/kyle-m-richardson)                       |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/paulmedwards/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/aaron-merrifield-234477195/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/brennanneilson/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/patrick-replogle-409a92193/)                |               [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/miguel-leal-6b6905168/)            |

<br>


# API Documentation

#### 1️⃣ Backend deployed at [AWS RDS](https://master.d3oqswdfi1a994.amplifyapp.com/) <br>

![build](https://github.com/Lambda-School-Labs/neighborhood-chef-be/workflows/build/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/e704a7d41bbcb50a6783/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e704a7d41bbcb50a6783/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/neighborhood-chef-be/test_coverage)
![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **Install Postgres Docker** (see section of same name) to setup PostgreSQL Docker development instance
- **yarn server** to start the local server

Testing:

- **yarn test** to start server using testing environment
- **yarn test:watch** to continuously use testing environment
- **yarn test:watchTroubleshoot** to debug while using testing environment
- **yarn test:watchWithLogs** to view logs while using testing environment
- **yarn test:coverage** to view test coverage

### Install Postgres Docker

First, ensure you've created a file named `/.env` with the same variable names as in the `/.env.example` file. The values can differ from the examples based on your preferred settings, if desired.

On Windows, it's probably best to setup `Windows Subsystem for Linux v2` (`WSL2`), [available in Windows 10, version 2004](https://devblogs.microsoft.com/commandline/wsl2-will-be-generally-available-in-windows-10-version-2004/), and the `Microsoft Terminal (preview)` app from the Microsoft App Store. Instructions below for Ubuntu Linux can be followed in `WSL2` if you install the Ubuntu instance. `Docker Desktop` for Windows only works on Windows 10 Professional or Enterprise/Workstation editions, it will not install on Home edition. You can use the older `docker toolkit` on Windows 10 Home and run the script in it's included Bash shell.

Ensure you have installed these pre-requisites:

- `Docker Desktop`, `docker toolkit`, or `docker.io` Community Edition. Ensure the command line application (`docker`) is in your path and available when issuing the command `docker`.
  - Ubuntu Linux: `sudo apt install docker.io`
  - Windows/macOS: download & install Docker Desktop
- Postgres command line application (`psql`) in your path and available when issuing the command `psql`.
  - Ubuntu Linux: `sudo apt install postgresql-client` (and its dependencies). You do not need to install the server.
  - Windows/macOS: download PostgreSQL and install at minimum the command line application. If you install the PostgreSQL service, it will conflict with the docker instance we're trying to setup, so be sure to disable the PostgreSQL service provided by the installer if you install it.
- Knex command line application (`knex`) globally installed so that it is in your path and available when issuing the command `knex`.
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

| Type     | Name               | variables                          | Description                             |
| -------- | ------------------ | ---------------------------------- | --------------------------------------- |
| Query    | getAllUsers        | none                               | Returns all users                       |
| Query    | getUserById        | (id: ID!)                          | Returns a single user                   |
| Query    | getAuthoredEvents  | (id: ID!)                          | Returns logged in user's events         |
| Query    | getInvitedEvents   | (id: ID!)                          | Returns events that user is invited too |
| Query    | getAttendingEvents | (id: ID!)                          | Returns events user is attending        |
| Mutation | addUser            | (input: NewUserInput!)             | Adds a user account                     |
| Mutation | updateUser         | (id: ID!, input: UpdateUserInput!) | Updates a user account                  |
| Mutation | removeUser         | (id: ID!)                          | Deletes a user account                  |

#### Event

| Type     | Name              | variables                           | Description                             |
| -------- | ----------------- | ----------------------------------- | --------------------------------------- |
| Query    | getAllEvents      | none                                | Returns all events                      |
| Query    | getEventById      | (id: ID!)                           | Returns a single event                  |
| Mutation | addEvent          | (input: NewEventInput!)             | Adds a new event                        |
| Mutation | updateEvent       | (id: ID!, input: UpdateEventInput!) | Updates an event                        |
| Mutation | removeEvent       | (id: ID!)                           | Deletes an event                        |
| Mutation | inviteUserToEvent | (input: EventInviteInput!)          | Invites user to event                   |
| Mutation | updateInvitation  | (input: UpdateInviteInput!)         | Update invitation status                |
| Mutation | removeInvitation  | (input: RemoveInviteInput!)         | Deletes an invitation                   |

#### Category

| Type     | Name            | variables                  | Description               |
| -------- | --------------- | -------------------------- | ------------------------- |
| Query    | getCategories   | none                       | Returns all categories    |
| Query    | getCategoryById | (id: ID!)                  | Returns a single category |
| Mutation | addCategory     | (input: NewCategoryInput!) | Adds a new category       |

# Data Model

#### 2️⃣ User Type and Inputs

---

```graphql
  type User {
    id: ID!
    email: String!
    password: String!
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
```

```graphql
  input NewUserInput {
    id: ID
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    gender: String
    address: String!
    latitude: Float!
    longitude: Float!
    photo: String
  }
```

```graphql
  input UpdateUserInput {
    id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    gender: String
    address: String
    latitude: Float
    longitude: Float
    photo: String
  }
```

#### Event Type and Inputs

---

```graphql
  type Event {
    id: ID!
    date: String!
    startTime: String!
    endTime: String
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
```

```graphql
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
```

```graphql
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
```

#### EventInvite Inputs

```graphql
  input EventInviteInput {
    event_id: Int!
    user_id: Int!
    inviter_id: Int!
    status: String!
  }
```

```graphql
  input UpdateInviteInput {
    event_id: Int!
    user_id: Int!
    status: String!
  }
```

```graphql
 input RemoveInviteInput {
    event_id: Int!
    user_id: Int!
  }
```

#### Category Type and Inputs

---

```graphql
  type Category {
    id: ID!
    category: String!
  }
```

```graphql
 input NewCategoryInput {
    id: ID
    category: String!
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
