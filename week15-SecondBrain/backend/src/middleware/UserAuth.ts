import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../config";

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

export function UserAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized - No token provided" });
        return; // 🔹 Prevents further execution
    }

    const token = authHeader.split(" ")[1];

    if (!env.SECRET_KEY) {
        res.status(500).json({ message: "Server error - SECRET_KEY is missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, env.SECRET_KEY as string) as JwtPayload;

        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Invalid token - User ID missing" });
            return;
        }

        req.id = decoded.id; // 🔹 Attach user ID to the request object
        next(); // 🔹 Ensure next() is called instead of returning a response
    } catch (error) {
        res.status(401).json({ message: "Authentication failed", error: error instanceof Error ? error.message : "Unknown error" });
    }
}
