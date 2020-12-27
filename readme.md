Next + Hasura + Next Auth + Urql
===

Basic project with next, hasura, next auth and urql all configured.
We use graphql code generator to automaticaly generate our queries.
Provides `ACTION_BASE_URL` to point to the `api` for the app.

Running Hasura
```
docker-compose up -d
cd hasura
hasura console
```

Running the App
```
yarn dev
```

