import * as jwt from 'jsonwebtoken';

/**
 * Define the expected shape of the token payload.
 * This helps TypeScript enforce structure and provide autocomplete.
 */
export interface TokenPayload {
  userId: number;       // Unique identifier for the user
  iat?: number;         // Issued At timestamp (added by JWT)
  exp?: number;         // Expiration timestamp (added by JWT)
  // Add more fields if needed: role, email, etc.
}

/**
 * Generates a JWT for a given user ID.
 * This is typically called after login or signup.
 */
export const generateToken = (userId: number): string => {
  const token = jwt.sign(
    { userId },                          // Payload: what we want to encode
    process.env.JWT_SECRET as string,    // Secret key used to sign the token
    { expiresIn: '1h' }                  // Token expires in 1 hour
  );
  return token;
};

/**
 * Verifies the authenticity and validity of a JWT.
 * Throws an error if the token is expired, malformed, or tampered with.
 */
export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as TokenPayload;

  return decoded;
};

/**
 * Decodes a JWT without verifying its signature or expiration.
 * Useful for non-sensitive operations like logging or UI previews.
 */
export const decodeToken = (token: string): TokenPayload | null => {
  const decoded = jwt.decode(token) as TokenPayload | null;
  return decoded;
};