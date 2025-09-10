const express = require("express");
const fs = require("fs"); // Include the File System module

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Store the total number of requests
let totalNoOfReqCount = {
  count: 0,
};

// Middleware to log request details and count total requests
const logRequestType = (req, res, next) => {
  // Increment the request count
  totalNoOfReqCount.count++;

  // Log request details for debugging purposes
  const data = {
    timestamp: new Date(),
    ip: req.ip,
    method: req.method,
    url: req.url,
    userAgent: req.headers["user-agent"] || "Unknown",
  };

  console.log(data);
  console.log("Total Request Count: ", totalNoOfReqCount.count);
  next(); // Pass control to the next middleware or route
};

app.use(logRequestType); // Apply the middleware to every request

// GET route for the root endpoint
app.get("/", function (req, res) {
  res.status(200).json({
    success: true,
    message: "Welcome to the server",
  });
});

// Endpoint to expose the total number of requests
app.get("/total-requests", function (req, res) {
  res.status(200).json({
    success: true,
    totalRequests: totalNoOfReqCount.count,
  });
});

// Function to write data to a file (for POST route)
const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data written successfully");
      }
    });
  });
};

// POST route to save data to file
app.post("/post", async function (req, res) {
  const data = req.body; // Capture data from request body
  try {
    const result = await writeData(data); // Wait for writeData function to complete
    res.status(200).json({ success: true, message: result });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error saving data", error: err });
  }
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server is running on port 3000"); // Server is started on port 3000
});
