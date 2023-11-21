// Import Apollo Server and schema 
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import custom data source 
const EtherDataSource = require("./datasource/ethDatasource");  

// Import schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Define resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass in EtherDataSource instance 
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }), 
});

// Start the server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
