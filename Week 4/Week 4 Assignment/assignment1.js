const express = require("express");
const app = express();
requestCount = 0;


// middleware
function requestcountup(req,res,next){
    requestCount++;
    next()
}

app.get("/reqcon", function (req, res) {
  res.json({
    msg: `the current request count is ${requestCount}`,
  });
});


app.use(requestcountup);

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