export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  Register?: Maybe<RegisterOutput>;
};

export type MutationRegisterArgs = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type RegisterOutput = {
  __typename?: "RegisterOutput";
  id: Scalars["String"];
};
