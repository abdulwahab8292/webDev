require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const { adminModel } = require('./db'); 
const bcrypt = require('bcrypt'); 

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/admin', adminRouter);

async function main() {
    try {
        
        await mongoose.connect("mongodb+srv://abdulj210:Y5sMpGif98Gu1dNS@cluster0.tiytg.mongodb.net/coursera-app");

        console.log('Connected to MongoDB');

        // Check if sample admin already exists
        const sampleAdmin = await adminModel.findOne({ email: "admin@example.com" });
        if (!sampleAdmin) {
            const hashedPassword = await bcrypt.hash("adminpassword", 10);
            
            await adminModel.create({
                email: "admin@example.com",
                password: hashedPassword,
                firstName: "Admin",
                lastName: "User"
            });

            console.log('Sample admin created');
        } else {
            console.log('Sample admin already exists');
        }

        app.listen(3000, () => console.log('Server is running on port 3000'));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

main();
