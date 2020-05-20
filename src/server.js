const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const cors = require('cors');

const authRouter = require('./routes/authrouter');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const mocks = require('./mocks');
const authenticationRequired = require('./middleware/oktaAuthentication');

const app = express();
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/auth', authRouter);

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
    validationRules: [depthLimit(3)],

    playground: {
        path: path,
        settings: {
            'editor.theme': "dark"
        }
    }
});

server.applyMiddleware({ app, path });

module.exports = app;
