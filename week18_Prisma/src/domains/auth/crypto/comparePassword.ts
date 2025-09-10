import { compare } from "bcrypt-ts";
/**
 * Compares a plain text password with a hashed password.
 * @param plainPassword - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @return A promise that resolves to true if the passwords match, false otherwise.
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
}
