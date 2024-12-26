const { Router } = require('express');
const { z } = require('zod');
const { PurchaseModel, CourseModel } = require('../db');
const { userAuth } = require('../authorization/userAuth');
const courseRouter = Router();

courseRouter.get("/preview", async function (req, res) {
    try {
        // empty array means no condition hence returns all of the courses 
        const courses = await CourseModel.find();
        res.json({ status: "success", data: { courses } });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ status: "error", message: "Could not fetch courses" });
    }
});

courseRouter.use(userAuth);

courseRouter.post("/purchase", async (req, res) => {
    const reqBody = z.object({
        courseId: z.string(),
    });

    const safeParseData = reqBody.safeParse(req.body);

    if (!safeParseData.success) {
        return res.status(400).json({
            status: "error",
            message: "Invalid input format",
            errors: safeParseData.error.errors,
        });
    }

    try {
        const { courseId } = req.body;
        const userId = req.userId;

        await PurchaseModel.create({ courseId, userId });

        res.json({ status: "success", message: "You have purchased this course" });
    } catch (err) {
        console.error("Error purchasing course:", err);
        res.status(500).json({ status: "error", message: "Could not process the purchase" });
    }
});

module.exports = {
    courseRouter,
};
