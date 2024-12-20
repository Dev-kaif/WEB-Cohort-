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

// put a middleware in series format "rout => middelware => function" (function is also like a middleware)

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