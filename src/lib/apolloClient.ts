import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

// Disable SSL check ONLY in local development
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export function getApolloClient() {
  if (!process.env.MAGENTO_GRAPHQL_URL) {
    throw new Error("MAGENTO_GRAPHQL_URL is not set in environment variables");
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.MAGENTO_GRAPHQL_URL,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
