import { Request, Response } from "express";
import { hash } from "bcryptjs";

import getDb from "../config/dbConnection";

export default {
  signup: async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    const user = await getDb()?.collection("users").findOne({ email });
    if (user) {
      return res.send("Email already exists");
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
};
