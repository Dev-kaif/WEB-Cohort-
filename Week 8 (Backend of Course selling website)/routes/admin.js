const { AdminModel, CourseModel } = require("../db");
const { adminAuth } = require("../authorization/adminAuth");
const { JWT_ADMIN_SECRET } = require("../config");

const bcrypt = require("bcrypt");
const saltRounds = 5;

const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { Router } = require("express");
const adminRouter = Router();


// Admin signup route - Creates a new admin account.
adminRouter.post("/signup", async function (req, res) {
  const reqBody = z.object({
    email: z.string().max(100).min(5),
    firstName: z.string().max(100).min(1),
    lastName: z.string().max(100).min(1),
    password: z.string().max(30).min(5),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format. Please ensure all fields are filled correctly.",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { email, password, firstName, lastName } = req.body;

    // Hash the password before saving
    const hash = await bcrypt.hash(password, saltRounds);

    await AdminModel.create({
      email,
      password: hash,
      firstName,
      lastName,
    });

    res.json({
      message: "Admin signed up successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during signup: Admin might already exist.",
      error: err.message,
    });
  }
});


// Admin signin route - Authenticates an admin and returns a token.

adminRouter.post("/signin", async function (req, res) {
  try {
    const { email, password } = req.body;

    const response = await AdminModel.findOne({ email });

    if (!response) {
      return res.status(404).json({ message: "Admin not found. Please Sign up." });
    }

    const match = await bcrypt.compare(password, response.password);

    if (match) {
      const token = jwt.sign({ id: response._id }, JWT_ADMIN_SECRET);
      res.json({ token, message: "Successfully signed in as admin." });
    } else {
      res.status(403).json({ message: "Incorrect credentials." });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error during sign-in process.",
      error: err.message,
    });
  }
});

// Middleware for admin authorization
adminRouter.use(adminAuth);

/**
 * Add a new course - Accessible only to authenticated admins.
 */
adminRouter.post("/course/add", async function (req, res) {
  const reqBody = z.object({
    title: z.string().max(100).min(5),
    description: z.string().max(100).min(5),
    imageUrl: z.string().max(100).min(5),
    price: z.number().max(10000).min(1),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format. Please ensure all fields are filled correctly.",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { title, description, price, imageUrl } = req.body;

    if (!req.adminID) {
      return res.status(403).json({ message: "Unauthorized: Admin ID is required to create a course." });
    }

    const course = await CourseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: req.adminID,
    });

    res.status(201).json({
      message: "Course added successfully.",
      courseId: course._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while adding the course.",
      error: err.message,
    });
  }
});

/**
 * Delete a course - Deletes a course by title.
 */
adminRouter.delete("/course/delete", async function (req, res) {
  const reqBody = z.object({
    title: z.string().max(100).min(5),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format. Please ensure the title is provided.",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { title } = req.body;
    const result = await CourseModel.deleteOne({ title });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting the course.",
      error: err.message,
    });
  }
});

/**
 * Update a course - Updates a course by ID.
 */
adminRouter.put("/course/update", async function (req, res) {
  const reqBody = z.object({
    courseId: z.string(),
    title: z.string().max(100).min(5),
    description: z.string().max(100).min(5),
    imageUrl: z.string().max(100).min(5),
    price: z.number().min(1),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format. Please ensure all fields are filled correctly.",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { courseId, title, description, price, imageUrl } = req.body;

    const result = await CourseModel.updateOne(
      { _id: courseId, creatorId: req.adminID },
      { title, description, price, imageUrl }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found or unauthorized." });
    }

    res.status(200).json({ message: "Course updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating the course.",
      error: err.message,
    });
  }
});

/**
 * Get all courses created by the authenticated admin.
 */
adminRouter.get("/course/bulk", async (req, res) => {
  try {
    const courses = await CourseModel.find({ creatorId: req.adminID }).lean();

    res.status(200).json({
      message: "Courses fetched successfully.",
      courses,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching courses.",
      error: err.message,
    });
  }
});



module.exports = {
  adminRouter,
};
