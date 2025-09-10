import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../db";
import { AuthSchema } from "../validation/authvalidation";
import env from "../config";

const router = Router();

// 🔹 Signup Route
router.post("/signup", async (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
    const parsedData = AuthSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of credentials", error: parsedData.error.errors });
        return;
    }

    try {
        const { username, password } = parsedData.data;
        const findUser = await UserModel.findOne({ username });

        if (findUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", username });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 🔹 Signin Route
router.post("/signin", async (req: Request, res: Response) => {
    const parsedData = AuthSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of credentials", error: parsedData.error.errors });
        return;
    }

    try {
        const { username, password } = parsedData.data;
        const findUser = await UserModel.findOne({ username });

        if (!findUser) {
            res.status(404).json({ message: "Username not found" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }

        const token = jwt.sign({ id: findUser._id }, env.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while signing in",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

export default router;
