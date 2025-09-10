import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../token/tokenUtils';

/**
 * Middleware to protect routes using JWT authentication.
 * - Checks for a Bearer token in the Authorization header.
 * - Verifies the token and extracts userId.
 * - Attaches userId to req and calls next().
 * - Responds with 401 or 403 if token is missing or invalid.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or malformed' });
    return;
  }

  // Extract token from header
  const token = authHeader.split(' ')[1];
  if(!token){
    res.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    // Verify token and extract payload
    const decoded = verifyToken(token);
    req.userId = decoded.userId;

    // Pass control to next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
};