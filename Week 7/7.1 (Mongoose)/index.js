// Import the User and Todo models from the database module
const { UserModel, TodoModel } = require('./db');

// Import mongoose for database connection
const mongoose = require('mongoose');

// Connect to MongoDB Atlas database using mongoose
mongoose.connect("");

// Import express for creating the web server
const express = require('express');
const app = express();

// Import jsonwebtoken for authentication
const jwt = require("jsonwebtoken");
// Secret key used for signing the JWT tokens
const JWT_SECRET = "kssncjnsd"; 

// Enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Enable JSON body parsing in incoming requests
app.use(express.json());

// Route for user signup
app.post("/signup", async function(req, res) {
    // Extract user details from request body
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try {
        // Create a new user using the UserModel.create() method
        await UserModel.create({
            email: email,
            password: password,
            name: name,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User already exists!",
        });
    }

    // Send success response
    res.json({
        message: "Signup Successful"
    });
});

// Route for user sign-in
app.post("/signin", async function(req, res) {
    // Extract credentials from request body
    const email = req.body.email;
    const password = req.body.password;

    // Check if user exists with given credentials
    const user = await UserModel.findOne({
        email,
        password
    });

    // If user is found, generate JWT and send success response
    if (user) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ message: "Login successful", token: token });
    } else {
        // If credentials are invalid, send error response
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
});

// Middleware function for authentication
function auth(req, res, next) {
    // Retrieve token from request headers
    const token = req.headers.token;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: "Please Sign-In" });
    }

    // Verify the token using the secret key
    const verifiedToken = jwt.verify(token, JWT_SECRET);

    // If the token is valid, attach user ID to the request object
    if (verifiedToken) {
        req.userID = verifiedToken.id;
        next();
    } else {
        // If the token is invalid, send error response
        return res.status(401).json({ message: "Invalid Token" });
    }
}

// Use the authentication middleware for protected routes
app.use(auth);

// Route to add a new todo
app.post("/add-todo", async function(req, res) {
    // Extract todo details and user ID from the request
    let todo = req.body.todo;
    let id = req.userID;

    // Save the new todo to the database
    const user = await TodoModel.create({
        title: todo,
        done: false,
        userID: id
    });

    // Send success response with the added todo
    res.json({ message: "Added new todo", todo, id });
});

// Route to get all todos for a user
app.get("/todo", auth, async function(req, res) {
    // Get the user ID from the request object
    const userId = req.userId;

    // Find all todos associated with the user ID
    const todos = await TodoModel.find({
        userId,
    });

    // Send the todos to the client
    res.json({
        todos,
    });
});

app.listen(3000);
