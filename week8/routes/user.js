const { Router } = require('express');
const userRouter = Router();
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel, purchaseModel } = require('../db'); 
const { JWT_KEY } = require('../config');
const { userAuthentication } = require('../authentication/userAuth'); 

userRouter.post('/signup', async function(req, res) {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(20).refine((value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            return hasUpperCase && hasNumber && hasSpecial;
        }, {
            message: "Password must contain at least one uppercase letter, one number, and one special character"
        }),
        firstName: z.string().min(1).max(70),
        lastName: z.string().min(1).max(70)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: 'Invalid Format of credentials',
            errors: parsedDataWithSuccess.error.errors
        });
    }

    const { email, password, firstName, lastName } = parsedDataWithSuccess.data;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    }
});

userRouter.post('/signin', async function(req, res) {
    const requiredBodyForSignin = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(20).refine((value) => {
            const upperCaseChar = /[A-Z]/.test(value);
            const number = /[0-9]/.test(value);
            const specialChar = /[!@#$%^&*()-_+=/\|~`?.,]/.test(value);
            return upperCaseChar && number && specialChar;
        })
    });
    const parsedDataWithSuccess = requiredBodyForSignin.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: 'Invalid Format of credentials',
            errors: parsedDataWithSuccess.error.errors
        });
    }
    const { email, password } = parsedDataWithSuccess.data;
    try {
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.status(404).json({
                message: 'User not found or Invalid password'
            });
        }
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(404).json({
                message: 'User not found or Invalid password'
            });
        }
        const token = jwt.sign({ id: userExists._id.toString() }, JWT_KEY, { expiresIn: '1h' });
        res.json({
            message: 'User signed in successfully',
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    }
});

userRouter.get('/purchases', userAuthentication, async function(req, res) {
    const userId = req.userId; 
    try {
        const purchases = await purchaseModel.find({ userId }).populate('courseId');
        if (!purchases.length) {
            return res.status(404).json({
                message: 'No purchases found for the user'
            });
        }
        res.json({
            message: 'User purchases retrieved successfully',
            purchases: purchases
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    }
});


module.exports = {
    userRouter: userRouter
};
