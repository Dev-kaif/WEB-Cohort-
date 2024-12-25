const {Router} = require('express');
const courseRouter = Router();
const {auth} =require('../authorization/userAuth')

courseRouter.use(auth);

courseRouter.post("/purchase",function(req,res){
    res.json({message:"you have purchased this course"})
})

courseRouter.get("/preview",function(req,res){
    res.json({message:"you have previwed all courses"})
})

module.exports = {
    courseRouter
}