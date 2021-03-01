const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')

const logger = require('./logger');
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')
const { initDB } = require('./sql-engine');

initDB()

const app = express()

const server = new ApolloServer({ typeDefs, resolvers, cors: { origin: true } });
server.applyMiddleware({ app });

app
  .use(cors)
  .listen({ port: 4000 }, () =>
    logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );