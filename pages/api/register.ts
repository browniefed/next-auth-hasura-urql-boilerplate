import client from "../../lib/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { MutationRegisterArgs } from "../../hasuraCustomTypes";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password }: MutationRegisterArgs = req.body.input;

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  try {
    await client.CreateUser({
      user: {
        email: email.toLowerCase(),
        password: hash,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      user: "Failed to register, account exists",
    });
  }
};

export default register;
