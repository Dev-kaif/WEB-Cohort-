require('dotenv').config();

const express = require('express');
const app = express();

const {userRouter} = require("./routes/users")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin")

const mongoose = require('mongoose');

app.use(express.json());

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)


async function main() {
    try {
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to the database");
        
        app.listen(3000);

    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    }
}

main();
