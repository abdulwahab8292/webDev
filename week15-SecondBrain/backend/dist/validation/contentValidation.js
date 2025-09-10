"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentSchema = void 0;
const zod_1 = require("zod");
exports.contentSchema = zod_1.z.object({
    link: zod_1.z.string().url(),
    type: zod_1.z.enum(["image", "video", "text"]),
    title: zod_1.z.string().min(1, "Title must not be empty"),
    tags: zod_1.z.array(zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid tag ID format")), // Ensure ObjectId format
});
