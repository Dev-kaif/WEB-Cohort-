const express = require("express");
const app = express();

// Middleware is a function that runs before the main request handler
// It has access to the request (req), response (res), and the next function
// The 'next' function is used to pass control to the next middleware in the stack


//function that returns boolen
function agecheaker(age) {
  if (age >= 14) {
    return true;
  } else {
    return false;
  } 
}

app.get("/ride1", function (req, res) {
  if (agecheaker(req.query.age)) {
    res.json({
      msg: "you hsve suvccesfully riden the ride1",
    });
  } else {
    res.status(411).json({
      msg: "sorry you are not at that age yet",
    });
  }
});


app.get("/ride2", function (req, res) {
  if (agecheaker(req.query.age)) {
    res.json({
      msg: "you hsve suvccesfully riden the ride2",
    });
  } else {
    res.status(411).json({
      msg: "sorry you are not at that age yet",
    });
  }
});

app.listen(3001);
