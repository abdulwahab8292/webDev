const fs = require("fs");
function fn(resolve) {
  resolve();
  console.log("After Resolved");
}

const p = new Promise(fn);
p.then(function () {
  console.log("After Promise");
});

const fetchData = () =>
  new Promise((resolve, reject) => {
    fs.readFile("a.txt", "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error("Error occured", err));
