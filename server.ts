import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./database/schema.ts";
import { resolvers } from "./database/resolvers.ts";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 7474;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT, host: "0.0.0.0" },
});

console.log(`🚀 Server ready at ${url}`);
