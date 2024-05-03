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
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import localForage from "localforage";
import { getSession } from "next-auth/react";

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  if (!session?.user.accessToken) return { headers: { ...headers } };

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${session?.user.accessToken}`
    }
  };
});

const cache = new NextSSRInMemoryCache({
  typePolicies: {
    User: {
      keyFields: ["id", "userName"]
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
    if (persistor) {
      return;
    }
    async function init() {
      const newPersistor = new CachePersistor({
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
  }, [persistor]);

  if (!client) {
    return null; // Return null while client is not yet initialized
  }

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
