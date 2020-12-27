module.exports = {
  overwrite: true,
  generates: {
    "./data/anonymous.tsx": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-role": "anonymous",
            },
          },
        },
      ],
      documents: ["./queries/anonymous/**.graphql"],
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
    "./data/admin.tsx": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-admin-secret": "secret",
              "x-hasura-role": "admin",
            },
          },
        },
      ],
      documents: ["./queries/admin/**.graphql"],
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
    "./data/admin_client.ts": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-admin-secret": "secret",
              "x-hasura-role": "admin",
            },
          },
        },
      ],
      documents: ["./queries/admin/**.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
    "./data/user.tsx": {
      schema: [
        {
          "http://localhost:8080/v1/graphql": {
            headers: {
              "x-hasura-admin-secret": "secret",
              "x-hasura-role": "user",
            },
          },
        },
      ],
      documents: ["./queries/user/**.graphql"],
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsTypes: true,
        constEnums: true,
      },
    },
  },
};
