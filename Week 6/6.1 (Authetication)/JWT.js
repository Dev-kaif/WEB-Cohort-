// Traditional tokens require repeated requests to the database for user authentication, 
// like verifying the username and password. These tokens are "stateful" because 
// the server needs to store session data in the database.


// JWTs (JSON Web Tokens), on the other hand, are "stateless." 
// They don’t require server-side storage because user information, like the username,
// is embedded inside the token itself.

// JWTs reduce the database workload by removing the need for repeated authorization queries. 
// Once issued, the token can be verified directly using the secret key without consulting the database.

// It’s important to understand that JWTs are signed, not encrypted. 
// Signing ensures the data in the token is valid and hasn’t been altered. 
// Anyone can decode the token to see the information it contains.
// But they cant, authenticate it or verify the token

// A real-world equivalent of signing is a signature. Anyone can see or verify the signature,
// but only the creator of the signature can produce it authentically and used by.

// This method avoids unnecessary trips to the backend and database for every request,making the system more efficient and scalable.

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
