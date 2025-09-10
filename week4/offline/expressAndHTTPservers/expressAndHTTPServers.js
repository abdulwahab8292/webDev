const express = require("express");
const fs = require("fs");
const app = express();

// Use middleware to parse incoming JSON data in the body
app.use(express.json());

// Function to calculate the sum of integers from 1 to n

// Function to write data to a file using a promise
let putData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("data.txt", JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve("Data saved successfully!");
    });
  });
};

// Function to read existing data from the file
let readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("data.txt", "utf8", (err, data) => {
      if (err) {
        // If the file doesn't exist, resolve with an empty array
        if (err.code === "ENOENT") return resolve([]);
        return reject(err);
      }

      // Try parsing the existing data
      try {
        const jsonData = JSON.parse(data);
        // Ensure it is an array; if not, return an empty array
        if (!Array.isArray(jsonData)) {
          return resolve([]);
        }
        resolve(jsonData);
      } catch (parseError) {
        // If parsing fails, return an empty array
        resolve([]);
      }
    });
  });
};

// POST route to receive JSON data and save it to a file
app.post("/post", function (req, res) {
  const newUserData = req.body; // Get the JSON object from the request body

  // Check if `newUserData` is a valid object
  if (typeof newUserData !== "object") {
    return res.status(400).send("Invalid data: Expected a JSON object");
  }

  // Read existing data, add new data, and save it
  readData()
    .then((existingData) => {
      // Append new user data
      existingData.push(newUserData);
      return putData(existingData);
    })
    .then((msg) => res.send(msg))
    .catch((err) => res.status(500).send("Failed to save data: " + err));
});

// GET route to calculate sum and return a JSON response
// GET route to retrieve a user by id
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get the id from the request parameters

  // Check if `id` is a valid number
  if (isNaN(id)) {
    return res
      .status(400)
      .send({ error: "Please provide a valid number for 'id'" });
  }

  // Read existing data
  readData()
    .then((existingData) => {
      // Find the user by id
      const user = existingData.find((u) => u.id === id);

      // If user is found, return the user data
      if (user) {
        return res.json(user);
      } else {
        // If user is not found, return a 404 error
        return res.status(404).send({ error: "User not found" });
      }
    })
    .catch((err) =>
      res.status(500).send("Failed to retrieve user data: " + err)
    );
});

// DELETE route to remove a user by id
app.delete("/delete/:id", function (req, res) {
  const userId = parseInt(req.params.id); // Get the id from the request parameters

  // Read existing data
  readData()
    .then((existingData) => {
      // Filter out the user with the specified id
      const updatedData = existingData.filter((user) => user.id !== userId);

      // Check if a user was found
      if (existingData.length === updatedData.length) {
        return res.status(404).send("User not found");
      }

      // Write the updated data back to the file
      return putData(updatedData);
    })
    .then((msg) => res.send(msg))
    .catch((err) => res.status(500).send("Failed to delete user: " + err));
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
