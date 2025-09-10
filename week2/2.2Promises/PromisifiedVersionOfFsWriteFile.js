const fs = require("fs");

const writeData = () =>
  new Promise((resolve, reject) => {
    fs.writeFile("a.txt", "I am being written", "utf8", (err) => {
      if (err) {
        reject(err); 
      } else {
        resolve("Data written successfully!"); 
      }
    });
  });

writeData()
  .then((message) => console.log(message))
  .catch((error) => console.error("An error occurred:", error));
