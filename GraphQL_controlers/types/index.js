const { mergeTypes } = require("merge-graphql-schemas");

const sales = require("./SalesTypes");


const typeDefs = [sales];

module.exports = sales