import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import sdk from "../../../lib/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getHasuraModel, getUser } from "../../../lib/auth";

const options = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/",
  },
  providers: [
    Providers.Credentials({
      name: "EmailPassword",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const { email, password } = credentials;
        const data = await sdk.FindUserFromEmail({
          email: (email || "").toLowerCase(),
        });

        const user = data?.users?.[0];

        if (user) {
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return false;
          } else {
            return getUser(user);
          }
        } else {
          return false;
        }
      },
    }),
  ],

  secret: process.env.JWT_SIGNING_SECRET,
  session: {
    jwt: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  },
  jwt: {
    encode: async ({ token }) => {
      if (token["https://hasura.io/jwt/claims"]) {
        return jwt.sign(token, process.env.JWT_SIGNING_SECRET, {
          algorithm: "HS512",
        });
      }

      const tokenContents = {
        id: token.id,
        email: token.email,
        name: token?.name && `${token.name}`,
        iat: Date.now() / 1000,
        sub: token.id,
        ...getHasuraModel(token),
      };

      const encodedToken = jwt.sign(
        tokenContents,
        process.env.JWT_SIGNING_SECRET,
        {
          algorithm: "HS512",
          expiresIn: "60d",
        }
      );

      return encodedToken;
    },
    decode: async ({ token }: { token: string; secret: string }) => {
      const decodedToken = jwt.verify(token, process.env.JWT_SIGNING_SECRET, {
        algorithms: ["HS512"],
      });

      return decodedToken;
    },
  },

  callbacks: {
    redirect: async (url, baseUrl) => {
      return Promise.resolve(url);
    },
    session: async (session, user) => {
      const encodedToken = jwt.sign(user, process.env.JWT_SIGNING_SECRET, {
        algorithm: "HS512",
      });
      session.token = encodedToken;
      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    signIn: async (user, account, profile) => {
      if (user) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
