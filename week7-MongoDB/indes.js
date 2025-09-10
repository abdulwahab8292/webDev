const express = require('express');
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt-secret";

app.use(express.json());

app.post('/signup', async function (req, res) {
    try {
        const user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });
        await user.save();
        res.json({ message: "User registered successfully", user });
    } catch (err) {
        console.error("Error registering user", err); // Log the error
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});


app.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    else {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({
            message: "User authenticated successfully",
            token: token,
        });
    }
});

app.post("/todo",auth, async function (req, res) {
    try{
        const userId = req.userId;
        const title = req.body.title;
        await TodoModel.create({
            title,
            userId
        });
        res.json({
            userId : userId,
        });
    }
    catch(err){
        res.status(500).json({ message: "Error creating todo", error: err.message });
    }
});

app.get("/todos",auth,async function (req, res) {
    try {
        const todos = await TodoModel.find({ userId:req.userId});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: "Error fetching todos", error: err.message });
    }
});
function auth(req, res, next) {
    try {
        const token = req.headers.token;
        const decodeData = jwt.verify(token, JWT_SECRET);
        if (decodeData) {
            req.userId = decodeData.id; 
            next();
        } else {
            throw new Error("Invalid token");
        }
    } catch (err) {
        res.status(401).json({ message: "Access denied. Invalid token", error: err.message });
    }
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
