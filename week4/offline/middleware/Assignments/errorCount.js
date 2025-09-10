const express = require("express");
const app = express();
app.use(express.json());

let errorCount= 0;

app.use(rateLimitter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Request successful",
  });
});
//error handling middleware
app.use((err, req, res, next) => {
  res.status(404).json({ error: err.message });
  errorCount++;
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
