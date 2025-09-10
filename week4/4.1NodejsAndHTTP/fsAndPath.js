const fs = require("fs");
const path = require("path");
console.log("current Directory :", __dirname);
const myPath = path.join(__dirname, "a.txt");
console.log(myPath);

const fetchData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(myPath, "utf8", (err, data) => {
      // Use myPath here
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

fetchData()
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });
