const express = require("express");
const app = express();

const JWT_SECRET = "WWJKCWKCWJN";
var jwt = require("jsonwebtoken");

app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
  const { username, password } = req.body; 
  const FoundUser = users.find((user) => user.username === username); 

  if (FoundUser) {
    return res.status(400).json({ error: "Username already exists" }); 
  }

  users.push({ username: username, password: password });

  res.json({ message: "User created successfully" }); 
});

app.post("/signin", function (req, res) {
  const { username, password } = req.body; 

  const FoundUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (FoundUser) {

    const token = jwt.sign({ username: FoundUser.username }, JWT_SECRET);
    FoundUser.token = token;

    res.json({ message: "Login successful", token: token }); 

  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
});

// Authentication middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers.token; // Extract the token from the request headers
  
  if (!token) {
    return res.status(401).json({ message: "Missing token" }); // Respond if the token is missing
  }

    // Verify the token using the secret key
    const verifiedToken = jwt.verify(token, JWT_SECRET);

    // Check if the user exists in the users array
    const FoundUser = users.find((user) => user.username === verifiedToken.username);

    if (FoundUser) {
    
      req.user = verifiedToken; // Attach the verified token to the request object
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ message: "Invalid Token" }); 
    }

}

// Apply the auth middleware to all routes below this line
app.use(auth);

app.get("/me", function (req, res) {

  const token = req.user; // Get the verified token from the request

  const FoundUser = users.find((user) => user.username === token.username);

  res.json({ username: FoundUser.username, password: FoundUser.password });
});

app.listen(3000);
