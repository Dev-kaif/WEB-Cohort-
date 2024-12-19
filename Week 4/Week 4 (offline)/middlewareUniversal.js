const express = require("express");
const app = express();

// middleware
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

// Universal Middleware | but can only be used for the route handlers under it

app.use(ageCheckerMiddleware);


app.get("/ride1", function (req, res) {
    res.json({
        msg: "you hsve suvccesfully riden the ride1",
    });
});
app.get("/ride2", function (req, res) {
  res.json({
    msg: "you hsve suvccesfully riden the ride2",
  });
});

app.listen(3001);