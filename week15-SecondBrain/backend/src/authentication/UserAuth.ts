// Import types from Express
import { Request, Response, NextFunction } from "express";

// Import JWT library and the JwtPayload type
import jwt, { JwtPayload } from "jsonwebtoken";

// Import environment variables (like SECRET_KEY)
import env from "../config";

/**
 * Extend Express's Request interface to include a custom 'id' property.
 * This allows us to attach the authenticated user's ID to req.id
 */
declare global {
    namespace Express {
        interface Request {
            id?: string; // optional, because initially it won't exist
        }
    }
}

/**
 * Middleware function for authenticating users using JWT.
 * This function checks the 'Authorization' header, verifies the token,
 * and attaches the user ID to the request object if valid.
 */
export function UserAuth(req: Request, res: Response, next: NextFunction): void {
    // 🔹 Get the 'Authorization' header from the request
    const authHeader = req.headers["authorization"];

    // 🔹 If the header is missing or does not start with 'Bearer ', reject request
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized - No token provided" });
        return; // 🔹 Stops execution, middleware does not proceed
    }

    // 🔹 Extract the token from header: 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    // 🔹 Ensure SECRET_KEY exists in environment variables
    if (!env.SECRET_KEY) {
        res.status(500).json({ message: "Server error - SECRET_KEY is missing" });
        return; // 🔹 Cannot verify token without secret
    }

    try {
        // 🔹 Verify the JWT using the secret key
        // jwt.verify returns the payload if token is valid
        const decoded = jwt.verify(token, env.SECRET_KEY as string) as JwtPayload;

        // 🔹 Check that decoded payload exists and has a user ID
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Invalid token - User ID missing" });
            return; // 🔹 Invalid token
        }

        // 🔹 Attach the user ID to the request object for future handlers
        req.id = decoded.id;

        // 🔹 Call next() to pass control to the next middleware/route handler
        next();
    } catch (error) {
        // 🔹 If token verification fails, return 401 Unauthorized
        res.status(401).json({ 
            message: "Authentication failed", 
            error: error instanceof Error ? error.message : "Unknown error" 
        });
    }
}

/**
 * How it works:
 * 1. Frontend sends JWT in the 'Authorization' header: 'Bearer <token>'.
 * 2. Middleware checks if header exists and extracts token.
 * 3. jwt.verify() checks if token is valid and not expired.
 * 4. If valid, user ID is attached to req.id.
 * 5. Next route handler can access req.id to know which user is making the request.
 * 6. If invalid, returns 401 Unauthorized or 500 Server Error if secret missing.
 */
