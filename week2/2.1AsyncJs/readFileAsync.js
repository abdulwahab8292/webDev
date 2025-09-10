const fs = require("fs");

fs.readFile("a.txt", "utf-8", (err, contents) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(contents);
});
// successfull execution --> err value will be null
// unsuccesull execution --> contents value will be undefined
