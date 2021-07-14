import { Request, Response } from "express";
import { hash, compare } from "bcryptjs";

import getDb from "../config/dbConnection";
import ResponseError from "../utils/ResponseError";
import ResponseCodes from "../utils/ResponseCodes";

export default {
  signup: async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    const user = await getDb()?.collection("users").findOne({ email });
    if (user) {
      return res
        .status(ResponseCodes.CONFLICT)
        .json(
          new ResponseError(ResponseCodes.CONFLICT, "Email already exists")
        );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await getDb()
      ?.collection("users")
      .insertOne({ email, name, password: hashedPassword });
    if (newUser)
      return res.status(ResponseCodes.CREATED).json({
        user: {
          id: newUser.ops[0]._id,
          email: newUser.ops[0].email,
          name: newUser.ops[0].name,
        },
      });

    return res
      .status(ResponseCodes.SERVICE_UNAVAILABLE)
      .json(
        new ResponseError(
          ResponseCodes.SERVICE_UNAVAILABLE,
          "Unalble to perform action"
        )
      );
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await getDb()?.collection("users").findOne({ email });
    if (!user) {
      return res.send("User not found");
    }
    const isPasswordsMatch = await compare(password, user.password);
    if (!isPasswordsMatch) return res.send("Incorrect Password");
    return res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  },
};
