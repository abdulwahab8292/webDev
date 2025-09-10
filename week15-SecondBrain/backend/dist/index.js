"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const config_1 = __importDefault(require("./config"));
const authvalidation_1 = require("./validation/authvalidation");
const contentValidation_1 = require("./validation/contentValidation");
const UserAuth_1 = require("./authentication/UserAuth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// 🔹 Signup Route
app.post("/api/v1/signup", async (req, res) => {
    const parsedData = authvalidation_1.AuthSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of credentials", error: parsedData.error.errors });
        return;
    }
    try {
        const { username, password } = parsedData.data;
        const findUser = await db_1.UserModel.findOne({ username });
        if (findUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await db_1.UserModel.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", username });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the user",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// 🔹 Signin Route
app.post("/api/v1/signin", async (req, res) => {
    const parsedData = authvalidation_1.AuthSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of credentials", error: parsedData.error.errors });
        return;
    }
    try {
        const { username, password } = parsedData.data;
        const findUser = await db_1.UserModel.findOne({ username });
        if (!findUser) {
            res.status(404).json({ message: "Username not found" });
            return;
        }
        const isPasswordCorrect = await bcrypt_1.default.compare(password, findUser.password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: findUser._id }, config_1.default.SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while signing in",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// 🔹 Content Route (Requires Authentication)
app.post("/api/v1/content", UserAuth_1.UserAuth, async (req, res) => {
    const parsedData = contentValidation_1.contentSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid format of content", error: parsedData.error.errors });
        return;
    }
    try {
        const { link, type, title, tags } = parsedData.data;
        const userId = new mongoose_1.default.Types.ObjectId(req.id);
        // Check if the user exists
        const findUser = await db_1.UserModel.findById(userId);
        if (!findUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Create new content
        const newContent = await db_1.ContentModel.create({ link, type, title, tags, userId });
        res.status(201).json({ message: "Content created successfully", content: newContent });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while creating content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
app.get("/api/v1/content", UserAuth_1.UserAuth, async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the request
        const contents = await db_1.ContentModel.find({ userId }).populate("tags"); // Fetch content for the authenticated user
        res.status(200).json({ message: "Content fetched successfully", contents });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// 🔹 Connect to MongoDB & Start Server
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.MONGO_URL);
        console.log("Connected to MongoDB");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
}
main();
