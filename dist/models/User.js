"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
class User {
    constructor(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    signup() {
        var _a;
        (_a = dbConnection_1.default()) === null || _a === void 0 ? void 0 : _a.collection("users").insertOne({
            email: this.email,
            name: this.name,
            password: this.password,
        }).then((user) => console.log(user));
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map