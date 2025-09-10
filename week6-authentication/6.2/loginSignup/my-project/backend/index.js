const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const users = [];

app.use(express.json());
app.use(cors());

function checkUser(req, res, next) {
  const { username } = req.body;

  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    req.existingUser = existingUser;
  }
  next();
}

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Attach user details to request object
    next();
  });
}

app.post("/", checkUser, (req, res) => {
  const { username, password } = req.body;

  if (req.existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const newUser = { username, password };
  users.push(newUser);
  res.status(201).json({ message: "User added successfully" });
});

app.post("/login", checkUser, (req, res) => {
  const { username, password } = req.body;

  if (!req.existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.existingUser.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { username: req.existingUser.username },
    "secret_key",
    { expiresIn: "1h" }
  );
  req.existingUser.token = token;
  res.status(200).json({ message: "Login successful", token });
});

// Protected route to get user information
app.get("/getInfo", authenticateToken, (req, res) => {
  // Since the token is valid, we can find the user based on the username in the token
  const user = users.find((u) => u.username === req.user.username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send back user details (excluding password)
  res.status(200).json({
    firstname: user.firstname || "Not provided",
    lastname: user.lastname || "Not provided",
    username: user.username,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
