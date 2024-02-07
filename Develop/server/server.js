const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const db = require('./config/connection');
const routes = require('./routes');
const  {gql}  = require('graphql');
const { expressMiddleware } = require('@apollo/server/express4');

const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas/index');



// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();