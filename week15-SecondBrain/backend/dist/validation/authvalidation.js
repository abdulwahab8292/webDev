"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSchema = exports.passwordSchema = exports.usernameSchema = void 0;
const zod_1 = require("zod");
exports.usernameSchema = zod_1.z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(100, "Username must not exceed 100 characters")
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), "Username must only contain letters and numbers");
exports.passwordSchema = zod_1.z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .refine((value) => /[A-Z]/.test(value), "Password must include at least one uppercase letter")
    .refine((value) => /[0-9]/.test(value), "Password must include at least one number")
    .refine((value) => /[!@#$%^&*(),.?\":{}|<>]/.test(value), "Password must include at least one special character");
exports.AuthSchema = zod_1.z.object({
    username: exports.usernameSchema,
    password: exports.passwordSchema,
});
