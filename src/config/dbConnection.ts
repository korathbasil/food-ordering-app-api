import { MongoClient, MongoError } from "mongodb";
import { Db } from "mongodb";

import { DB_CONNECTION_URL } from "./constants";

let db: Db | null = null;

export const connectToDatabase = (
  cb: (err: MongoError | null, db: Db | null) => void
) => {
  const client = new MongoClient(DB_CONNECTION_URL);

  client.connect((err, data) => {
    if (err) cb(err, null);
    else {
      db = data.db("movie-app");
      cb(null, db);
    }
  });
};

const getDb = () => {
  if (db) {
    return db;
  } else {
    console.log("Not connected to any database");
    return;
  }
};

export default getDb;
