"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const dbConnection_1 = __importDefault(require("../config/dbConnection"));
const ResponseError_1 = __importDefault(require("../utils/ResponseError"));
const ResponseCodes_1 = __importDefault(require("../utils/ResponseCodes"));
exports.default = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const { email, name, password } = req.body;
        const user = yield ((_a = dbConnection_1.default()) === null || _a === void 0 ? void 0 : _a.collection("users").findOne({ email }));
        if (user) {
            return res
                .status(ResponseCodes_1.default.CONFLICT)
                .json(new ResponseError_1.default(ResponseCodes_1.default.CONFLICT, "Email already exists"));
        }
        const hashedPassword = yield bcryptjs_1.hash(password, 10);
        const newUser = yield ((_b = dbConnection_1.default()) === null || _b === void 0 ? void 0 : _b.collection("users").insertOne({ email, name, password: hashedPassword }));
        if (newUser)
            return res.status(ResponseCodes_1.default.CREATED).json({
                user: {
                    id: newUser.ops[0]._id,
                    email: newUser.ops[0].email,
                    name: newUser.ops[0].name,
                },
            });
        return res
            .status(ResponseCodes_1.default.SERVICE_UNAVAILABLE)
            .json(new ResponseError_1.default(ResponseCodes_1.default.SERVICE_UNAVAILABLE, "Unalble to perform action"));
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const { email, password } = req.body;
        const user = yield ((_c = dbConnection_1.default()) === null || _c === void 0 ? void 0 : _c.collection("users").findOne({ email }));
        if (!user) {
            return res.send("User not found");
        }
        const isPasswordsMatch = yield bcryptjs_1.compare(password, user.password);
        if (!isPasswordsMatch)
            return res.send("Incorrect Password");
        return res.json({
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }),
};
//# sourceMappingURL=user.js.map