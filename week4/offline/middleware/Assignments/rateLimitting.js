const express = require("express");

const app = express();

app.use(express.json());
let numberOfRequestsForUser = {};
setInterval(()=>{
  numberOfRequestsForUser = {};
},1000)
app.use(function(req,res,next){
  const user_id = req.header["user-id"];
  if(numberOfRequestsForUser[user_id]){
    numberOfRequestsForUser[user_id]++;
    if(numberOfRequestsForUser[user_id] > 5){
      res.status(429).json({
        message: "Too many requests, please try again later.",
      });
      return;
    }
    else {
      next();
    }
  
  }
  else {
    numberOfRequestsForUser[user_id] = 1;
    next();
  }
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Request successful",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
