const express = require("express");
const app = express();

//A middleware
function ageCheckerMiddleware(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.json({
      msg: "Sorry (Fuck U), You are not old enough yet!",
    });
  }
}

// Middleware in Express follows a "route => middleware => function" sequence
// In this sequence, the function acts like a middleware as well
// Express syntax is essentially a series of middleware functions executed in order

app.get("/ride1", ageCheckerMiddleware, function (req, res) {
  res.json({
    msg: "you hsve suvccesfully riden the ride1",
  });
});
app.get("/ride2", ageCheckerMiddleware, function (req, res) {
  res.json({
    msg: "you hsve suvccesfully riden the ride2",
  });
});

app.listen(3001);