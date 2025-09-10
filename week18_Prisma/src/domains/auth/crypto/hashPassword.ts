import { genSalt, hash } from "bcrypt-ts";
/**
 * Hashes a plain text password using bcrypt.
 * @param password - The plain text password to hash.
 * @return A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}