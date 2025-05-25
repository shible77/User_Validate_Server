"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserValidateControllers_1 = require("../controllers/UserValidateControllers");
const userValidateRouter = express_1.default.Router();
userValidateRouter.post('/signup', UserValidateControllers_1.createUser);
userValidateRouter.post('/login', UserValidateControllers_1.loginUser);
userValidateRouter.get('/user/:id', UserValidateControllers_1.getUser);
exports.default = userValidateRouter;
