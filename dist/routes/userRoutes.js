"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const userRouter = express_1.default.Router();
userRouter.post('/signup', userControllers_1.createUser);
userRouter.post('/login', userControllers_1.loginUser);
exports.default = userRouter;
