"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_1 = __importDefault(require("../controllers/user"));
router.get("/signup", user_1.default.signup);
exports.default = router;
//# sourceMappingURL=user.js.map