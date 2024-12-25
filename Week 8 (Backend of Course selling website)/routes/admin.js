const { AdminModel, CourseModel } = require("../db");
const { adminAuth } = require("../authorization/adminAuth");
const { JWT_ADMIN_SECRET } = require("../config");

const bcrypt = require("bcrypt");
const saltRounds = 5;

const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const reqBody = z.object({
    email: z.string().max(100).min(5),
    firstName: z.string().max(100).min(5),
    lastName: z.string().max(100).min(5),
    password: z.string().max(30).min(5),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { email, password, firstName, lastName } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    await AdminModel.create({
      email: email,
      password: hash,
      firstName: firstName,
      lastName: lastName,
    });

    res.json({
      message: "Admin signed up successfully",
    });
  } catch (err) {
    res.json({
      message: "Admin already exists",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const response = await AdminModel.findOne({
    email: email,
  });

  if (!response) {
    return res.json({ message: "Please Sign up" });
  }

  const match = await bcrypt.compare(password, response.password);

  if (match) {
    const token = jwt.sign({ id: response._id }, JWT_ADMIN_SECRET);
    res.json({ token: token, message: "You have sucessfully SignIN as admin" });
  } else {
    res.status(403).json({ message: "Incorrect credentials" });
  }
});

adminRouter.use(adminAuth);

adminRouter.post("/course/add", async function (req, res) {
  const reqBody = z.object({
    title: z.string().max(100).min(5),
    description: z.string().max(100).min(5),
    imageUrl: z.string().max(100).min(5),
    price: z.number().max(30).min(5),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: safeParseData.error.errors,
    });
  }

  const { title, description, price, imageUrl } = req.body;

  try {
    // Check for admin ID
    if (!req.adminID) {
      return res.status(403).json({
        message: "Unauthorized: Admin ID is required to create a course",
      });
    }

    // Create a new course
    const course = await CourseModel.create({
      title,
      description,
      imageUrl,
      price,
      creatorId: req.adminID,
    });

    res.status(201).json({
      message: "You have successfully added the course",
      courseId: course._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while adding the course",
    });
  }
});

adminRouter.delete("/course/delete", async function (req, res) {
  const reqBody = z.object({
    title: z.string().max(100).min(5),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: safeParseData.error.errors,
    });
  }

  try {
    const { title } = req.body;
    const result = await CourseModel.deleteOne({ title });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "You have successfully deleted the course",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while deleting the course",
    });
  }
});

adminRouter.put("/course/update", async function (req, res) {
  const reqBody = z.object({
    title: z.string().max(100).min(5),
    description: z.string().max(100).min(5),
    imageUrl: z.string().max(100).min(5),
    price: z.number(),
  });

  const safeParseData = reqBody.safeParse(req.body);

  if (!safeParseData.success) {
    return res.status(400).json({
      message: "Invalid input format",
      errors: safeParseData.error.errors,
    });
  }
  try {
    const { title, description, price, imageUrl } = req.body;
    const _id = req.body.courseId;
    const creatorId = req.adminID;

    await CourseModel.updateOne(
      // expects the frist ibject to the condition or which object to update
      {
        _id,
        creatorId
      },
      {
        title,
        description,
        price,
        imageUrl,
      }
    );
    res.status(200).json({
      message: "You have successfully updated the course",
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while updating the course",
    });
  }
});

adminRouter.get("/course/bulk", async function (req, res) {
  const creatorId = req.adminID;

  const courses = await CourseModel.find({
    creatorId,
  });
  res.json({ courses });
});

module.exports = {
  adminRouter,
};
