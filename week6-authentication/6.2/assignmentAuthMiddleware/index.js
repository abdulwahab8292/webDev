const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "abdulwahab"; // Secret key for signing tokens
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
  const userName = req.body.username;
  const password = req.body.password;

  // Check if the user already exists
  let checkUserExistence = users.find((u) => {
    return u.username === userName;
  });

  if (checkUserExistence) {
    return res.status(409).send("User already exists");
  } else {
    // Create a new user
    users.push({
      username: userName, // Fixed the property name to match the signin check
      password,
    });
    res.status(201).send("User created successfully");
  }
});

// Signin Route
app.post("/signin", function (req, res) {
  const userName = req.body.username;
  const password = req.body.password;

  // Validate user credentials
  let user = users.find((u) => {
    return u.username === userName && u.password === password;
  });

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Function to Verify Token (returns a promise)
async function verifyToken(token, secretkey) {
  try {
    return await jwt.verify(token, secretkey);
  } catch (error) {
    return null; // Return null if token verification fails
  }
}
async function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = await verifyToken(token, secretKey);
  if (decodedData) {
    req.decodedData = decodedData; // Store the decoded data in the request object for later use
    next();
  } else {
    res.status(403).send("You are not logged in.");
  }
}

app.get("/me", auth, function (req, res) {
  let user = users.find((u) => {
    return u.username === req.decodedData.username;
  });
  if (user) {
    res.status(200).json({
      username: user.username,
    });
  } else {
    res.status(401).send("User not found");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
