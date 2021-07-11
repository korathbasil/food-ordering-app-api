"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const constants_1 = require("./constants");
let db = null;
const connectToDatabase = (cb) => {
    const client = new mongodb_1.MongoClient(constants_1.DB_CONNECTION_URL);
    client.connect((err, data) => {
        if (err)
            cb(err, null);
        else {
            db = data.db("movie-app");
            cb(null, db);
        }
    });
};
exports.connectToDatabase = connectToDatabase;
const getDb = () => {
    if (db) {
        return db;
    }
    else {
        console.log("Not connected to any database");
        return;
    }
};
exports.default = getDb;
//# sourceMappingURL=dbConnection.js.map