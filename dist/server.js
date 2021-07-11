"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./config/constants");
const dbConnection_1 = require("./config/dbConnection");
const app = express_1.default();
app.get("/", (_, res) => {
    res.send("hello World");
});
dbConnection_1.connectToDatabase((err, _) => {
    if (err)
        console.log(err);
    else {
        console.log("Connected to database");
        app.listen(constants_1.PORT, () => console.log("server started at PORT : ", constants_1.PORT));
    }
});
//# sourceMappingURL=server.js.map