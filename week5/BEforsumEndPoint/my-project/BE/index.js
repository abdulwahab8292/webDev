const express = require("express");
const cors = require("cors"); // Include this to allow CORS for frontend

const app = express();
app.use(cors());
app.use(express.json());

// Define a POST route to calculate the sum
app.post("/sum", (req, res) => {
  const { firstNumber, secondNumber } = req.body;
  const sum = firstNumber + secondNumber;
  res.json({ sum });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
