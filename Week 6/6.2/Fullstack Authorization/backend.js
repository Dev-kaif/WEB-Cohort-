const express = require("express");
const app = express();

const path = require("path")

const JWT_SECRET = "WWJKCWKCWJN";
var jwt = require("jsonwebtoken");

app.use(express.json());

const users = [];

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/signup", function (req, res) {
  const { username, password } = req.body;
  const FoundUser = users.find((user) => user.username === username);
  
  if (FoundUser) {
    
    return res.status(401).json({ message: "Username already exists" });
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
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "please Sign-In " });
  }

  const verifiedToken = jwt.verify(token, JWT_SECRET);

  const FoundUser = users.find(
    (user) => user.username === verifiedToken.username
  );

  if (FoundUser) {
    req.user = verifiedToken;
    next();
  } else {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

app.use(auth);

app.get("/me", function (req, res) {
  const token = req.user;

  const FoundUser = users.find((user) => user.username === token.username);

  res.json({ username: FoundUser.username, password: FoundUser.password });
});

app.listen(3000);
