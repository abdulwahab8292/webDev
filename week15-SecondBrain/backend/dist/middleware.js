"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "uRuser";
const usermiddleware = (req, res, next) => {
    const token = req.headers["token"];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
};
exports.usermiddleware = usermiddleware;
