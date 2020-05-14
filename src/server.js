const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const mocks = require('./mocks');
const authenticationRequired = require('./middleware/oktaAuthentication');

const app = express();
app.use(express.json());

const path = '/graphql'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false,
    context: async ({req}) => {
        const token = req.headers.authorization;

        const authenticated =  authenticationRequired(token);

        return { authenticated }
    }, 
    playground: {
        path: path,
        settings: {
        'editor.theme': "dark"
        }
    }
});

server.applyMiddleware({app, path});

module.exports = app;