const express = require("express");
const app = express();
app.use(express.json());
const users = [];

function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}
app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (users.find((u) => u.username === username)) {
    return res.status(409).send("Username already exists");
  }
  users.push({
    username: username,
    password: password,
    token: null,
  });
  res.status(201).send("User created successfully");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const validateUser = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!validateUser) {
    return res.status(401).send("Invalid username or password");
  } else {
    const token = generateToken();
    validateUser.token = token;
    console.log(users);
    return res.status(200).json({ username, token });
  }
});
app.get("/me", function (req, res) {
  const token = req.headers.token;
  const user = users.find((u) => u.token === token);
  if (!user) {
    return res.status(401).send("Invalid token");
  } else {
    return res.json({ username: user.username });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
