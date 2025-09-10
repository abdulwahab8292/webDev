import { z } from "zod";

export const contentSchema = z.object({
    link: z.string().url(),
    type: z.enum(["image", "video", "text"]),
    title: z.string().min(1, "Title must not be empty"),
    tags: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid tag ID format")), // Ensure ObjectId format
});