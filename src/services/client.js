import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { graphqlAPI } from "../config/api";

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlAPI,
    headers: {
      withCredentials: true
    },
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

export default client;
