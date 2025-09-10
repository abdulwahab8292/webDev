"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = UserAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function UserAuth(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized - No token provided" });
        return; // 🔹 Prevents further execution
    }
    const token = authHeader.split(" ")[1];
    if (!config_1.default.SECRET_KEY) {
        res.status(500).json({ message: "Server error - SECRET_KEY is missing" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET_KEY);
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Invalid token - User ID missing" });
            return;
        }
        req.id = decoded.id; // 🔹 Attach user ID to the request object
        next(); // 🔹 Ensure next() is called instead of returning a response
    }
    catch (error) {
        res.status(401).json({ message: "Authentication failed", error: error instanceof Error ? error.message : "Unknown error" });
    }
}
