import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel, ContentModel } from "../db";
import { contentSchema } from "../validation/contentValidation";
import { UserAuth } from "../middleware/UserAuth";

const router = Router();

// 🔹 Content Route (Requires Authentication)
router.post("/", UserAuth, async (req: Request, res: Response) => {
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

// 🔹 Get User Content Route
router.get("/", UserAuth, async (req: Request, res: Response) => {
    try {
        const userId = req.id; // Get the user ID from the request
        const contents = await ContentModel.find({ userId }).populate("tags"); // Fetch content for the authenticated user
        res.status(200).json({ message: "Content fetched successfully", contents });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// 🔹 Delete Content Route (Owner Only)
router.delete("/:contentId", UserAuth, async (req: Request, res: Response): Promise<void> => {
    try {
        const { contentId } = req.params;
        const userId = req.id; // Get the user ID from the request

        // Validate contentId format
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            res.status(400).json({ message: "Invalid content ID format" });
            return;
        }

        // Find the content and check ownership
        const content = await ContentModel.findById(contentId);
        
        if (!content) {
            res.status(404).json({ message: "Content not found" });
            return;
        }

        // Check if the user owns this content
        if (content.userId.toString() !== userId) {
            res.status(403).json({ message: "Access denied - You can only delete your own content" });
            return;
        }

        // Delete the content
        await ContentModel.findByIdAndDelete(contentId);

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

export default router;
