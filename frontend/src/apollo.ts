import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://it2810-32.idi.ntnu.no:7474",
  }),
  cache: new InMemoryCache(),
});

export default client;
