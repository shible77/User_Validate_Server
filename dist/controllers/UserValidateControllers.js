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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.createUser = void 0;
const setup_1 = require("../db/setup");
const schema_1 = require("../db/schema");
const zod_1 = require("zod");
const drizzle_orm_1 = require("drizzle-orm");
const userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    email: zod_1.z.string().email(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, first_name, last_name } = userSchema.parse(req.body);
        const [result] = yield setup_1.db.insert(schema_1.user_info).values({ username, password, email, first_name, last_name }).execute();
        return res.status(201).json({ message: "User created successfully", userId: result.insertId });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                name: "Invalid Data type",
                message: JSON.parse(error.message),
            });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.createUser = createUser;
const loginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = yield setup_1.db.select().from(schema_1.user_info).where((0, drizzle_orm_1.eq)(schema_1.user_info.email, email)).execute();
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const foundUser = user[0];
        if (foundUser.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({ message: "Login successful", userId: foundUser.id });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = zod_1.z.coerce.number().parse(req.params.id);
        const user = yield setup_1.db.select().from(schema_1.user_info).where((0, drizzle_orm_1.eq)(schema_1.user_info.id, userId)).execute();
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user[0]);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.getUser = getUser;
