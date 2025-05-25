import { Request, Response } from "express";
import { db } from "../db/setup";
import { users } from "../db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const userSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = userSchema.parse(req.body);
    const [result] = await db.insert(users).values({ username, password }).execute();
    return res.status(201).json({ message: "User created successfully", userId : result.insertId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        name: "Invalid Data type",
        message: JSON.parse(error.message),
      });
    }
    return res.status(500).json({message : 'Internal Server Error', error})
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {username, password} = userSchema.parse(req.body);
    const user = await db.select().from(users).where(eq(users.username, username)).execute();
    if(user.length > 0 && user[0].password === password) {
      return res.status(200).json({ status : true, message : 'User authenticated successfully', data : user[0] });
    }
    return res.status(401).json({ status : false, message : 'Invalid credentials'});
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        name: "Invalid Data type",
        message: JSON.parse(error.message),
      });
    }
    return res.status(500).json({message : 'Internal Server Error', error})
  }
};
