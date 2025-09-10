const express = require("express");
const JWT = require("jsonwebtoken");
const zod = require("zod");

const emailSchema = zod.string().email(); // Validates emails
const passwordSchema = zod.string().min(6); // Validates passwords

const app = express();
const SECRET_KEY = "IamTheSecretKey"; // Secret key for signing JWTs
app.use(express.json());

// Function to sign JWT
async function signJWT(username, password) {
  const usernameResponse = emailSchema.safeParse(username); // Validate email
  const passwordResponse = passwordSchema.safeParse(password); // Validate password

  // Check if both email and password are valid
  if (!usernameResponse.success || !passwordResponse.success) {
    return null; // Return null if validation fails
  }

  try {
    // Sign the JWT with the valid username and the SECRET_KEY
    const token = JWT.sign(
      { username }, // Payload
      SECRET_KEY // Secret key
    );
    return token;
  } catch (err) {
    console.error("Error signing JWT:", err);
    return null;
  }
}
