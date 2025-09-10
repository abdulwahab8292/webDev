import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel, ContentModel } from "./db";
import env from "./config";
import { AuthSchema } from "./validation/authvalidation"; 
import { contentSchema } from "./validation/contentValidation"; 
import { UserAuth } from "./middleware/UserAuth";
import { Schema } from "zod";

dotenv.config();
const app = express();
app.use(express.json());

// 🔹 Signup Route
app.post("/api/v1/signup", async (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
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
app.post("/api/v1/signin", async (req: Request, res: Response) => {
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

// 🔹 Content Route (Requires Authentication)
app.post("/api/v1/content", UserAuth, async (req: Request, res: Response) => {
    const parsedData = contentSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of content", error: parsedData.error.errors });
        return;
    }

    try {
        const { link, type, title, tags } = parsedData.data;
        const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.id); 

        // Check if the user exists
        const findUser = await UserModel.findById(userId);
        if (!findUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Create new content
        const newContent = await ContentModel.create({ link, type, title, tags, userId });

        res.status(201).json({ message: "Content created successfully", content: newContent });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
app.get("/api/v1/content",UserAuth, async (req:Request, res:Response)=> {
    try {
        const userId = req.id; // Get the user ID from the request
        const contents = await ContentModel.find({ userId }).populate("userId", "username");
        res.status(200).json({ message: "Content fetched successfully", contents });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
app.delete("/api/v1/content/:id",UserAuth, async(req:Request, res:Response) => {
    try {
        const contentId = req.params.id;
        const userId = req.id; // Get the user ID from the request
        const deletedContent = await ContentModel.findOneAndDelete({ _id: contentId, userId });
        if (!deletedContent) {
            res.status(404).json({ message: "Content not found or you do not have permission to delete it" });
            return;
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 🔹 Connect to MongoDB & Start Server
async function main(): Promise<void> {
    try {
        await mongoose.connect(env.MONGO_URL);
        console.log("Connected to MongoDB");

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}

main();