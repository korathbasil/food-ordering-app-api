import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { ObjectID } from "mongodb";

import getDb from "../config/dbConnection";
import ResponseError from "../utils/ResponseError";
import ResponseCodes from "../utils/ResponseCodes";

export default {
  show: async (_: Request, res: Response) => {
    const admin = await getDb()?.collection("admin").findOne({});
    if (!admin)
      return res
        .status(ResponseCodes.NOT_FOUND)
        .json(new ResponseError(ResponseCodes.NOT_FOUND, "Admin not exists"));
    return res
      .status(ResponseCodes.OK)
      .json({ admin: { id: admin._id, username: admin.username } });
  },

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
      ?.collection("admin")
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

    return res.status(ResponseCodes.CREATED).json({
      admin: { id: newAdmin.ops[0]._id, username: newAdmin.ops[0].username },
    });
  },

  remove: async (req: Request, res: Response) => {
    const admin = await getDb()?.collection("admin").findOne({});
    if (!admin)
      return res
        .status(ResponseCodes.NOT_FOUND)
        .json(new ResponseError(ResponseCodes.NOT_FOUND, "Admin not exists"));

    const { id } = req.body;
    return getDb()
      ?.collection("admin")
      .findOneAndDelete({ _id: new ObjectID(id) })
      .then(() => res.status(203).json({ message: "Admin deleted" }))
      .catch((err) => res.status(405).json({ err: err }));
  },

  addRestaurant: async (req: Request, res: Response) => {
    const { name, email, address, ownerName, ownerEmail } = req.body;

    const newRestaurant = await getDb()
      ?.collection("restaurants")
      .insertOne({
        name,
        email,
        address,
        owner: { name: ownerName, email: ownerEmail },
      });
    if (!newRestaurant)
      return res
        .status(404)
        .json(new ResponseError(404, "Can't perform action"));
    return res
      .status(ResponseCodes.CREATED)
      .json({ restaurant: newRestaurant.ops[0] });
  },
};
