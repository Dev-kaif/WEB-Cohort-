const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");


// bcrypt library is used to hash passwords securely and compare hashed passwords
const bcrypt = require('bcrypt');

// The number of rounds (iterations) used in the bcrypt hashing algorithm
// The higher the value, the more computationally expensive it becomes, 
// making it harder for attackers to crack the hash through brute force attacks.
// Typically, saltRounds values like 10 or 12 are used in production, but for testing, a smaller value like 5 can be used.
const saltRounds = 5;


mongoose.connect("mongodb+srv://kaifghalib123:HzxZg0906E5fQHe6@cluster0.mt9u1.mongodb.net/todo-hash")

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

     // Zod validation schema for the signup request body
     const requiredBody = z.object({
        email: z.string().min(5).max(100).email(),
        name: z.string().min(1).max(100),
        password: z.string().min(5).max(30)
    });

    // Validate the incoming request body
    const safeParsedData = requiredBody.safeParse(req.body);

    if (!safeParsedData.success) {
        // If validation fails, return a response with error details
        return res.status(400).json({
            message: "Invalid input format",
            errors: safeParsedData.error.errors
        });
    }
    
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    try {
        // Hash the password with bcrypt using a saltRounds value to control the cost factor
        const hash = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database with the provided email, hashed password, and name
        await UserModel.create({
            email: email,
            password: hash,
            name: name
        });

        // password: "$2b$05$1QKcQNZLwfnTyw18lUTEU.3jrlbTJ3ZfHELj53UKXdtNYDAZQzmWS"
        
        // $2b = The bcrypt algorithm identifier used for hashing
        // $05 = Cost factor (or "rounds") used in the bcrypt hashing process, which determines the computational complexity. 
        //       In this case, it was hashed with 2^5 iterations.

        // 1QKcQNZLwfnTyw18 = The 16-character random salt used to salt the password before hashing
        // The remaining string = The actual hashed password, which is the result of hashing the password and the salt.

        // Responding with a success message
        res.json({
            message: "User signed up successfully"
        });

    } catch (err) {
        // Handling any errors that occur during signup process (e.g., if user already exists)
        console.error(err);
        res.json({
            message: "User already exists"
        });
    }
});

app.post("/signin", async function(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    try {
        // Searching for a user by the provided email
        const response = await UserModel.findOne({
            email: email
        });

        // If no user is found, prompt the user to sign up
        if (!response) {
            res.json({ message: "Please Sign up" });
        }
        
        // Comparing the provided password with the stored hash using bcrypt
        const match = await bcrypt.compare(password, response.password);

        if (match) {
            // If the password matches, generate a JWT token for authentication
            const token = jwt.sign({ id: response._id }, JWT_SECRET);

            // Respond with the generated token
            res.json({ token: token });
        } else {
            // If the password doesn't match, return an error message
            res.status(403).json({
                message: "Incorrect credentials"
            });
        }
    } catch (error) {
        // Handling any errors that occur during the signin process
        res.json({ message: "An error occurred" });
    }
});



app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);