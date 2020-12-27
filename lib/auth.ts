import jwt from "jsonwebtoken";
import { UserFragment } from "../data/admin_client";

export const signToken = (user) => {
  return jwt.sign(getHasuraModel(user), process.env.JWT_SIGNING_SECRET, {
    algorithm: "HS256",
    expiresIn: "60d",
  });
};

export const getHasuraModel = (user: UserFragment) => {
  if (!user) {
    return null;
  }
  const allowedRoles = user.role === "ADMIN" ? ["admin", "user"] : ["user"];
  const tokenModel = {
    "https://hasura.io/jwt/claims": {
      "X-Hasura-Allowed-Roles": allowedRoles,
      "X-Hasura-Default-Role": allowedRoles[0],
      "X-Hasura-User-Id": `${user.id}`,
    },
  };

  return tokenModel;
};

export const getUser = (user: UserFragment) => {
  return {
    id: user.id,
    admin: user.role === "ADMIN",
    active: true,
    confirmed: true,
    email: user.email,
  };
};
