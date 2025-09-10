const { Router } = require('express');
const { userAuthentication } = require('../authentication/userAuth');
const { purchaseModel, courseModel } = require('../db'); 
const { z } = require('zod');
const mongoose = require('mongoose');
const courseRouter = Router();

courseRouter.get('/preview', async function(req, res) {
   const courses = await courseModel.find({});
   res.json({
        message: 'Course Preview',
        courses: courses
    });
});

courseRouter.post('/purchase', userAuthentication, async function(req, res) {
    const requireBody = z.object({
        courseId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value))
    });

    const parsedCourseData = requireBody.safeParse(req.body);

    if (!parsedCourseData.success) {
        return res.status(400).json({
            message: 'Invalid Format of course data',
            errors: parsedCourseData.error.errors
        });
    }

    const userId = req.userId; // Derive userId from authentication middleware
    const { courseId } = parsedCourseData.data;

    try {
        const checkDoubleBuy = await purchaseModel.findOne({ userId, courseId });
        if (checkDoubleBuy) {
            return res.status(409).json({
                message: 'User has already purchased this course'
            });
        }

        const newPurchase = await purchaseModel.create({ userId, courseId });
        res.status(201).json({
            message: 'Course purchased successfully',
            purchaseId: newPurchase._id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error purchasing course',
            error: error.message
        });
    }
});

module.exports = {
    courseRouter: courseRouter
};
