const fs = require("fs");

function fetchData(resolve, reject) {
  fs.readFile("a.txt", "utf8", (err, contents) => {
    if (err) {
      reject(err); // Reject the promise if there's an error
    } else {
      resolve(contents); // Resolve the promise with the contents of the file
    }
  });
}

const myPromise = new Promise(fetchData);

function printData(contents) {
  console.log(contents);
}

myPromise.then(printData).catch((error) => {
  console.error("An error occurred:", error);
});

//Method 2

const fs = require("fs");

const fetchData = () => new Promise((resolve, reject) => {
  fs.readFile("a.txt", "utf8", (err, contents) => {
    if (err) {
      reject(err); // Reject the promise if there's an error
    } else {
      resolve(contents); // Resolve the promise with the contents of the file
    }
  });
});

fetchData()
  .then(contents => console.log(contents))
  .catch(error => console.error("An error occurred:", error));

  