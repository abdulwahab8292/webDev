const fs = require("fs").promises; // Use the Promises API

async function writeData(path, data) {
    try {
        await fs.writeFile(path, data, "utf-8");
        console.log("Data written");
    } catch (error) {
        console.error("Error writing file:", error);
    }
}

async function readFile(path) {
    try {
        const response = await fs.readFile(path, "utf-8"); // Await reading the file
        const trimmedData = response.trim(); // Trim the content
        return trimmedData;
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

//promise based approach
function readfilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, content) => {
            if (err) {
                reject(err);
            } else {
                const trimmedData = content.trim();
                resolve(trimmedData);
            }
        });
    });
}

function writefilePromise(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => { 
            if (err) {
                reject(err);
            } else {
                resolve("Data written");
            }
        });
    });
}


readfilePromise("a.txt") 
    .then((content) => {
        if (content) {
            return writefilePromise("a.txt", content);
        }
    })
    .then(() => {
        console.log("Process completed successfully");
    })
    .catch((error) => {
        console.error("Error:", error);
    });

readFile("a.txt").then((data) => {
    if (data) {
        writeData("a.txt", data);
    }
});
