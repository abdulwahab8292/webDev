const express = require("express");

const app = express();

//function to check age
function isOldEnough(age) {
  if (age >= 14) return true;
  return false;
}
app.get("/ride1", function (req, res) {
  if (isOldEnough(req.query.age)) {
    res.json({
      msg: "you have successfully riden the ride 1",
    });
  } else {
    res.status(411).json({
      msg: "you are not old enough to ride this ride",
    });
  }
});
//Middleware
function isOldEnough2(req, res, next) {
  const age = parseInt(req.query.age);
  if (isNaN(age)) {
    return res.status(400).json({
      msg: "Invalid age",
    });
  }
  if (isOldEnough(age)) {
    next();
  } else {
    res.status(412).json({
      msg: "You are not old enough to ride this ride",
    });
  }
}
app.get("/ride2", isOldEnough2, function (req, res) {
  res.json({
    msg: "you have successfully riden the ride 2",
  });
});
app.get("/ride3", isOldEnough2, function (req, res) {
  res.json({
    msg: "you have successfully riden the ride 3",
  });
});
// if all of the routes uses same middleware then write app.use(middlewarename) and remove from every get fuynction or others

app.listen(3000);
