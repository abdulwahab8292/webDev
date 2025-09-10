const express = require("express");

const app = express();

app.use(express.json());
let count = 0;
//Middleware
function getNumberOfReq(req, res, next) {
  count++;
  next();
}
app.use(getNumberOfReq);
app.get("/getReq", function (req, res) {
  res.status(200).json({
    message: `You've made ${count} requests so far.`,
  });
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
