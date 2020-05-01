const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const authRouter = require('./routes/authrouter');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const mocks = require('./mocks');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const path = '/graphql'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false,
    playground: {
        path: path,
        settings: {
        'editor.theme': "dark"
        }
    }
});

server.applyMiddleware({app, path});

module.exports = app;