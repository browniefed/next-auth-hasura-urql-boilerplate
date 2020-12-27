import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  Client,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { getSession } from "next-auth/client";

let globalClient: Client | undefined;

const getAuth = async ({ authState }: any) => {
  if (!authState) {
    const session = await getSession();
    if (session?.token) {
      return { token: session.token };
    }
    return null;
  }
  return null;
};

function addAuthToOperation({ authState, operation }: any) {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  let headers: any = {
    Authorization: `Bearer ${authState.token}`,
  };

  if (operation.context?.role) {
    headers = {
      ...headers,
      "x-hasura-role": operation.context?.role,
    };
  }
  if (operation.context?.role === "anonymous") {
    delete headers.Authorization;
  }

  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          ...headers,
        },
      },
    },
  };
}

export const getClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_HASURA_API,
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange({
        getAuth,
        addAuthToOperation,
      }),
      fetchExchange,
    ],
  });
};

export const create = () => {
  if (typeof window === "undefined") {
    return getClient();
  }

  if (globalClient) {
    return globalClient;
  }

  globalClient = getClient();

  return globalClient;
};
