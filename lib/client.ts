import { GraphQLClient } from "graphql-request";
import { getSdk } from "../data/admin_client";

const defaultHeaders = {
  [`x-hasura-admin-secret`]: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
};

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
  {
    headers: {
      Accept: "application/json",
      ...defaultHeaders,
    },
  }
);

const sdk = getSdk(client);

export default sdk;
