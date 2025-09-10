const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/sum2", function (req, res) {
  console.log(req.body);
  const a = req.body.a;
  const b = req.body.b;
  res.status(200).json({
    ans: a + b,
  });
});
app.listen(3000);
