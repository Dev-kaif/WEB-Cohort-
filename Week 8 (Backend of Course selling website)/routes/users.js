const {UserModel,PurchaseModel} = require("../db");
const {JWT_USER_SECRET} = require("../config")
const { userAuth } = require('../authorization/userAuth');

const bcrypt = require('bcrypt');
const saltRounds = 5;

const jwt = require('jsonwebtoken');
const { z } = require("zod");

const {Router} = require('express');
const userRouter = Router();


userRouter.post("/signup",async function(req,res){

    const reqBody = z.object({
        email:z.string().max(100).min(5),
        firstName : z.string().max(100).min(1),
        lastName: z.string().max(100).min(1),
        password: z.string().max(30).min(5)
    })

    const safeParseData = reqBody.safeParse(req.body);

    if(!safeParseData.success){
        return res.status(400).json({
            message: "Invalid input format",
            errors: safeParseData.error.errors
        });
    }

    try{
        const {email,password,firstName,lastName} = req.body;

        const hash = await bcrypt.hash(password,saltRounds)

        await UserModel.create({
            email:email,
            password:hash,
            firstName:firstName,
            lastName:lastName
        })

        res.json({
            message: "User signed up successfully"
        });

    }catch (err) {
        res.json({
            message: "User already exists"
        });
    }
})


userRouter.post("/signin",async function(req,res){

    const {email,password} = req.body;

    const response = await UserModel.findOne({
        email:email
    })

    if (!response) {
      return  res.json({ message: "Please Sign up" });
    }

    
    const match = await bcrypt.compare(password,response.password);

    if(match){
        const token = jwt.sign({ id: response._id },JWT_USER_SECRET);

        res.json({token:token,message:"You have sucessfully SignIN"})
    }else {
        res.status(403).json({message: "Incorrect credentials"});
    }
})


userRouter.get("/purchases", userAuth, async (req, res) => {
    try {
      if (!req.userId) {
        return res.status(400).json({ error: "User ID is missing." });
      }
  
      const courses = await PurchaseModel.find({ userId: req.userId });
  
      if (!courses.length) {
        return res.status(404).json({ message: "No purchases found for this user." });
      }
  
      res.json({ success: true, total: courses.length, courses });
    } catch (error) {
      console.error("Error fetching purchases:", error);
      res.status(500).json({ error: "An error occurred while fetching purchases." });
    }
  });
  

module.exports = {
    userRouter
}