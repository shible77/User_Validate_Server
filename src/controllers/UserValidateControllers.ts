import { Request, Response } from "express";
import { db } from "../db/setup";
import { user_info } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const userSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
});

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, email, first_name, last_name } = userSchema.parse(req.body);
        const [result] = await db.insert(user_info).values({ username, password, email, first_name, last_name }).execute();
        return res.status(201).json({ message: "User created successfully", userId: result.insertId });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                name: "Invalid Data type",
                message: JSON.parse(error.message),
            });
        }
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
})
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await db.select().from(user_info).where(eq(user_info.email, email)).execute();
        
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const foundUser = user[0];
        if (foundUser.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({ message: "Login successful", userId: foundUser.id });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = z.coerce.number().parse(req.params.id);
        const user = await db.select().from(user_info).where(eq(user_info.id, userId)).execute();

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
}