const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { UserModel, TodoModel } = require('./db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jwt-secret';
const bcrypt = require('bcrypt');
const {z} = require('zod');
app.use(express.json());

mongoose.connect('mongodb+srv://abdulwahabj210:IBFGAHbxJ0bUHVh2@cluster0.tiytg.mongodb.net/myDatabase?retryWrites=true&w=majority');

app.post('/signup', async function(req, res) {
    const requiredBody = z.object({
        email : z.string().email().min(3),
        password : z.string().min(8).max(20).refine((value) => {
            const hasUppercase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            return hasUppercase && hasNumber && hasSpecial;
        }, {
            message: "Password must contain at least one uppercase letter, one number, and one special character"
        }),
        username : z.string().min(3)
    })
   //const parsedData = requiredBody.pasrse(req.body); ---> It requires a try and catch block as it throws error
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);//-> It doesn't throw error
    
    if(!parsedDataWithSuccess.success) {
        return res.status(404).json({
            message: 'Validation failed',
            errors: parsedDataWithSuccess.error.errors
        });
    }
    const { email, password, username } = parsedDataWithSuccess.data;
    try {
        
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) return res.status(409).json({ message: 'Email already registered' });
        const hashedPswd =await bcrypt.hash(password,5);
        const newUser = await UserModel.create({
            username, 
            password: hashedPswd,
            email
        });

        res.json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});



app.post('/signin', async function(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({
            message: 'User authenticated successfully',
            token: token
        });
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
    
});

app.post('/todo', auth, async function(req, res) {
    try {
        const userId = req.userId;
        const title = req.body.title;
        await TodoModel.create({
            title,
            userId
        });
        res.json({ message: 'Todo created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating todo', error: err.message });
    }
});

app.get('/todos', auth, async function(req, res) {
    try {
        const todos = await TodoModel.find({ userId: req.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err.message });
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
            throw new Error('Invalid token');
        }
    } catch (err) {
        res.status(401).json({ message: 'Access denied. Invalid token', error: err.message });
    }
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
