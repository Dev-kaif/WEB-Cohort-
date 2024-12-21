// Tokens traditionally require repeated requests to the database for user authentication,such as verifying the username and password.
// Tokens are "stateful" because they need to be stored in a database, while JWTs (JSON Web Tokens) are "stateless," meaning they don’t require storage in a database.
// To avoid repetitive database queries, we use JWTs, which encode user information within the token itself.
// This information, such as the username, is securely encoded and signed within the JWT.
// JWTs reduce the load on the database by eliminating frequent authorization requests.
// Using JWTs also avoids the need for a round trip to the backend server and database for each request.

const express = require("express");
const app = express();

// `JWT_SECRET` is a secret key used to sign and verify JWTs.
// It ensures the token's integrity by generating a signature with a hashing algorithm (e.g., HS256).
// The same secret key is used during verification to confirm that the token hasn’t been altered.
const JWT_SECRET = "WWJKCWKCWJN"; // Keep this key secure in a real application

// Import the `jsonwebtoken` library for working with JWTs.
var jwt = require("jsonwebtoken");

app.use(express.json()); // Middleware to parse JSON request bodies

// Array to store user credentials and tokens
const users = [];

// Endpoint for user registration
app.post("/signup", function (req, res) {
  const { username, password } = req.body;

  // Check if the username already exists in the `users` array
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Add the new user to the `users` array
  users.push({ username: username, password: password });

  res.json({ message: "User created successfully" });
});

// Endpoint for user login
app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  // Check if the username and password match an existing user
  const FoundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (FoundUser) {
    // Generate a JWT with the user's username as the payload
    const token = jwt.sign({ username: FoundUser.username }, JWT_SECRET);

    // Store the token in the user's object
    FoundUser.token = token;

    res.json({ message: "Login successful", token: token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// Endpoint to get user information (protected route)
app.get("/me", function (req, res) {
  const token = req.headers.token; // Extract the token from request headers

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Find the user based on the username in the decoded token
    const FoundUser = users.find((user) => user.username === decodedToken.username);

    if (FoundUser) {
      res.json({ username: FoundUser.username, password: FoundUser.password });
    } else {
      return res.status(401).json({ message: "Invalid Token" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
});

app.listen(3000);
