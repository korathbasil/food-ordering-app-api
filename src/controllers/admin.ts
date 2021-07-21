import { Request, Response } from "express";
import { hash } from "bcryptjs";

import getDb from "../config/dbConnection";
import ResponseError from "../utils/ResponseError";
import ResponseCodes from "../utils/ResponseCodes";

export default {
  create: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const admin = await getDb()?.collection("admin").findOne({});
    if (admin)
      return res
        .status(ResponseCodes.CONFLICT)
        .json(
          new ResponseError(ResponseCodes.CONFLICT, "Admin already exists")
        );
    const hashedPasssword = await hash(password, 10);
    const newAdmin = await getDb()
      ?.collection("users")
      .insertOne({ username, paswword: hashedPasssword });
    if (!newAdmin)
      return res
        .status(ResponseCodes.SERVICE_UNAVAILABLE)
        .json(
          new ResponseError(
            ResponseCodes.SERVICE_UNAVAILABLE,
            "Unalble to perform action"
          )
        );
    return res
      .status(ResponseCodes.CREATED)
      .json({
        admin: { id: newAdmin.ops[0]._Id, username: newAdmin.ops[0].username },
      });
  },
};
