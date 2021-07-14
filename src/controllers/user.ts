import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcryptjs";

import getDb from "../config/dbConnection";
// import BaseError from "../utils/BaseError";
import ResponseError from "../utils/ResponseError";

export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;
    const user = await getDb()?.collection("users").findOne({ email });
    if (user) {
      // return res.send("Email already exists");
      // return next({ status: 500, message: "Email already exists" });

      // throw new Error("Email already exists");
      // return next(new BaseError(500, "Email already exists"));
      // return next({ message: "Hello" });
      // return next(new ResponseError(300, "Already Exists"));
      return res.status(500).json(new ResponseError(300, "Hello"));
    }
    try {
      const hashedPassword = await hash(password, 10);
      const newUser = await getDb()
        ?.collection("users")
        .insertOne({ email, name, password: hashedPassword });

      if (newUser) return res.send(newUser.ops[0]);
      res.send("SAving User failed");
    } catch (err) {
      return console.error(err);
    }
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
