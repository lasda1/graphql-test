const typeDefs = require("./types/index.js");
const resolvers = require("./resolvers/index");
const { makeExecutableSchema } = require('graphql-tools');
const db = require ('../data/db')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

module.exports = schema;