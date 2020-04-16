const { gql } = require('apollo-server-express');


const typeDefs = gql`

type Query {
    status: String
}
`

module.exports = typeDefs;