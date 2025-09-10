const { Router } = require('express');
const adminRouter = Router();
const mongoose = require('mongoose');
const { adminModel, courseModel } = require("../db");
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY_ADMIN } = require('../config');
const { adminAuthentication } = require('../authentication/adminAuth'); // Fix middleware import

adminRouter.post('/signup', async function(req, res) {
    const adminRequiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(8).max(20).refine((value) => {
            const upperCaseChar = /[A-Z]/.test(value);
            const number = /[0-9]/.test(value);
            const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            return upperCaseChar && number && specialChar;
        }),
        firstName: z.string().min(1).max(70),
        lastName: z.string().min(1).max(70)
    });
    const parsedAdminData = adminRequiredBody.safeParse(req.body);
    if (!parsedAdminData.success) {
        return res.status(400).json({
            message: 'Invalid Format of credentials',
            errors: parsedAdminData.error.errors
        });
    }
    const { email, password, firstName, lastName } = parsedAdminData.data;
    try {
        const existingAdminData = await adminModel.findOne({ email: email });
        if (existingAdminData) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        res.status(201).json({
            message: 'User created successfully',
            user: newAdmin
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    }
});

adminRouter.post('/signin', async function(req, res) {
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
        const adminFind = await adminModel.findOne({ email: email });
        if (!adminFind) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        const match = await bcrypt.compare(password, adminFind.password);
        if (!match) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({ id: adminFind._id }, SECRET_KEY_ADMIN, { expiresIn: '1h' });
        res.json({
            message: 'Admin signed in successfully',
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error occurred',
            error: error.message
        });
    }
});


// Create a course
adminRouter.post('/course', adminAuthentication, async function(req, res) {
    const adminId = req.adminId;
    const requiredStructureOfCourse = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(10).max(1000),
        price: z.number().positive(),
        imageURL: z.string() // Adjusted to match schema
    });
    const parsedCourseData = requiredStructureOfCourse.safeParse(req.body);
    if (parsedCourseData.success) {
        try {
            const newCourse = await courseModel.create({
                title: parsedCourseData.data.title,
                description: parsedCourseData.data.description,
                price: parsedCourseData.data.price,
                imageURL: parsedCourseData.data.imageURL, // Note the change
                creatorId: adminId
            });
            res.status(201).json({
                message: 'Course created successfully',
                courseId: newCourse._id
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error occurred',
                error: error.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Invalid Format of course data',
            errors: parsedCourseData.error.errors
        });
    }
});

// Update the course
adminRouter.put('/course', adminAuthentication, async function(req, res) {
    const requiredStructOfCourseUpdation = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(10).max(1000),
        price: z.number().positive(),
        imageURL: z.string(), // Updated to match schema
        courseId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value))
    });

    const parsedStructure = requiredStructOfCourseUpdation.safeParse(req.body);
    if (parsedStructure.success) {
        const { title, description, price, imageURL, courseId } = parsedStructure.data;
        const adminId = req.adminId; // Ensure we use the authenticated admin's ID

        try {
            const findCourse = await courseModel.findOne({ _id: courseId, creatorId: adminId });
            if (!findCourse) {
                return res.status(404).json({
                    message: "Course not found or you do not have permission to update this course"
                });
            }

            // Update course details
            findCourse.title = title;
            findCourse.description = description;
            findCourse.price = price;
            findCourse.imageURL = imageURL;

            await findCourse.save();

            res.status(200).json({
                message: "Course updated successfully",
                course: findCourse
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred",
                error: error.message
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid Format of course data",
            errors: parsedStructure.error.errors
        });
    }
});

// Get all courses by admin
adminRouter.get('/bulk', adminAuthentication, async function(req, res) {
    const parsedBody = z.object({
        creatorId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value))
    }).safeParse({ creatorId: req.adminId });

    if (parsedBody.success) {
        try {
            const courses = await courseModel.find({ creatorId: parsedBody.data.creatorId });
            res.status(200).json({
                message: "Courses fetched successfully",
                courses
            });
        } catch (error) {
            res.status(500).json({
                message: "Error occurred",
                error: error.message
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid Format of creatorId",
            errors: parsedBody.error.errors
        });
    }
});

module.exports = {
    adminRouter: adminRouter
};