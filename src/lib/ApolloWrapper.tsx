"use client";

import { useCallback, useEffect, useState } from "react";
import { HttpLink, ApolloLink, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  SSRMultipartLink,
  NextSSRInMemoryCache
} from "@apollo/experimental-nextjs-app-support/ssr";

import { authTokens } from "@/app/graphql/reactiveVar/authTokens";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import localForage from "localforage";
import { getSession } from "next-auth/react";

const authLink = setContext(async (_, { headers }) => {
  if (authTokens() === "") return { headers: { ...headers } };
  const token = authTokens();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new NextSSRInMemoryCache({
  typePolicies: {
    User: {
      keyFields: ["id", "email"]
    },
    Build: {
      keyFields: ["buildName", "recipe", ["name"]]
    },
    Touch: {
      keyFields: ["id"]
    },
    Ingredient: {
      keyFields: ["name"]
    }
  }
});

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_API_URL
    //fetchOptions: { cache: "no-store" }
  });
  return new NextSSRApolloClient({
    cache,
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            authLink.concat(httpLink)
          ])
        : authLink.concat(httpLink)
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const [client, setClient] =
    useState<NextSSRApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();
  useEffect(() => {
    async function init() {
      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalForageWrapper(localForage),
        debug: true,
        trigger: "write"
      });
      await newPersistor.restore();
      setPersistor(newPersistor);
      setClient(makeClient);
    }

    init().catch(console.error);
  }, []);

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
