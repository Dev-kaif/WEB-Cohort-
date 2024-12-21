const express = require("express");
const app = express();
app.use(express.json());


// Array to store user credentials and tokens
const users = [];

// Genrates the random token for the user to sign in
function RandomToken() {
  const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
}


app.post("/signup", function (req, res) {
  const { username, password } = req.body;

  // Check if the username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // saves the username and password
  users.push({
    username: username,
    password: password,
  });

  // sends a signal that new acount is created
  res.json({ message: "User created successfully" });
  console.log(users);
});

app.post("/signin", function (req, res) {
    const { username, password } = req.body;

    // Check if the username and password match any existing user
    const FoundUser = users.find((user)=>(user.username === username && user.password === password))

    // If a match is found, generate a new token and send it back to the client. Otherwise, return an error.
    if (FoundUser) {
        const token = RandomToken();

        // Stores the user's token in users array
        FoundUser.token = token;
        // Sends a signal that a user has signed in
        res.json({ message: "Login successful", token: token });
    }else{
        return res.status(401).json({ error: "Invalid credentials" })
    }
    console.log(users);

});

// Get user information after signing in with valid token. Returns error if token is invalid or does not exist.
app.get("/me", function (req, res) {
    const token = req.headers.token;
    const FoundUser = users.find((user)=>(user.token === token))

    if (FoundUser) {
        res.json({ username:FoundUser.username, password:FoundUser.password });
    }else{
        return res.status(401).json({message:"invalid Token" })
    }
});

app.listen(3000);
