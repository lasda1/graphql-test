const { merge } = require("lodash");

const salesResolvers = require("./SaleResolver");


const {Sales,Users} = require("../../models/sale");


//relation between models


const resolvers = merge(
    salesResolvers
);

module.exports = resolvers;