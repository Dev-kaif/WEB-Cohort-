const mongoose = require('mongoose');

const {Schema} = require("mongoose")

const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email : {type:String,unique:true},
    firstName : String,
    lastName : String,
    password : String
})

const adminSchema = new Schema({
    email : {type:String,unique:true},
    firstName : String,
    lastName : String,
    password : String
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl:String,
    creatorId : ObjectId
})

const purchaseSchema = new Schema({
    courseId : ObjectId,
    userId : ObjectId
})

const UserModel = mongoose.model('User', userSchema);        
const AdminModel = mongoose.model('Admin', adminSchema);     
const CourseModel = mongoose.model('Course', courseSchema); 
const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}
