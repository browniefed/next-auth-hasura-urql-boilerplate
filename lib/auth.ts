import jwt from "jsonwebtoken";

export const signToken = (user) => {
  return jwt.sign(getHasuraModel(user), process.env.JWT_SIGNING_SECRET, {
    algorithm: "HS256",
    expiresIn: "60d",
  });
};

export const getHasuraModel = (user) => {
  if (!user) {
    return null;
  }
  const allowedRoles = user.admin ? ["admin", "user"] : ["user"];
  const tokenModel = {
    "https://hasura.io/jwt/claims": {
      "X-Hasura-Allowed-Roles": allowedRoles,
      "X-Hasura-Default-Role": allowedRoles[0],
      "X-Hasura-User-Id": `${user.id}`,
    },
  };

  return tokenModel;
};

export const getUser = (user: any) => {
  return {
    id: user.id,
    admin: user.admin,
    active: user.active,
    confirmed: user.confirmed,
    email: user.email,
    name: user.name,
  };
};
