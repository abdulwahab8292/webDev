const express = require("express");
const app = express();

//dynamic routes
app.get("/sum/:a/:b", function (req, res) {
  let a = parseInt(req.params.a);
  let b = parseInt(req.params.b);
  let sum = a + b;
  res.status(200).json({
    sum: sum,
  });
  // we will type localhost:3000/sum/20/30
});

app.get("/sum", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let sum = a + b;
  res.status(200).json({
    sum: sum,
  });
  //http://localhost:3000/sum?a=3&b=5
});
app.get("/subtract", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let sub = a - b;
  res.status(200).json({
    subtract: sub,
  });
});
app.get("/multiply", function (req, res) {
  let a = parseInt(req.query.a);
  let b = parseInt(req.query.b);
  let mult = a * b;
  res.status(200).json({
    multiply: mult,
  });
});
app.listen(3000);
