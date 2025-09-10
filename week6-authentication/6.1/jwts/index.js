const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_Secret = "abdulloveAllah";
const app = express();
app.use(express.json());

const users = [];

// Token verification function
function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null; // Return null if verification fails
  }
}

// Signup route
app.post("/signup", function (req, res) {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(409).send("Username already exists");
  }
  users.push({ username, password });
  res.status(201).send("User created successfully");
});

// Login route
app.post("/login", function (req, res) {
  const { username, password } = req.body;
  const validateUser = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!validateUser) {
    return res.status(401).send("Invalid username or password");
  }

  // Generate JWT token
  const token = jwt.sign({ username: validateUser.username }, JWT_Secret);
  return res.status(200).json({ username, token });
});

// Get user profile route
app.get("/me", function (req, res) {
  const token = req.headers.token; // JWT token from headers

  // Use verifyToken function for validation
  const decodedInfo = verifyToken(token, JWT_Secret);
  if (!decodedInfo) {
    return res.status(403).send("Invalid token");
  }

  const user = users.find((u) => u.username === decodedInfo.username);
  if (!user) {
    return res.status(401).send("User not found");
  } else {
    return res.json({ username: user.username });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
