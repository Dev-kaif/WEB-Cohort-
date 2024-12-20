const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


app.get("/multiply", function (req, res) {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    res.json({ a: a, b: b, operation: "multiply", output: a * b });
});

// parseInt extracts integers from a string and stops at non-numeric characters, while Number converts the entire value to a number or returns NaN if it's invalid
// Use Number if the input is guaranteed to be numeric or needs to handle decimals.
// Use parseInt when dealing with mixed or formatted strings where you need only the integer part.

app.get("/add", function (req, res) {
    let a = parseInt(req.query.a);
    let b = parseInt(req.query.b);
    res.json({ a: a, b: b, operation: "add", output: a + b });
});

// By adding ":" in front of a path segment (e.g., ":a" and ":b"), 
// we define dynamic route parameters. These can be accessed 
// using `req.params` as key-value pairs, where the key is the parameter name.

app.get("/addDynamic/:a/:b", function (req, res) {
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    res.json({ a: a, b: b, operation: "add", output: a + b });
});

app.get("/sub", function (req, res) {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    res.json({ a: a, b: b, operation: "subtract", output: a - b });
});

app.get("/div", function (req, res) {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    if (b === 0) {
        return res.status(400).json({
            error: "Division by zero is not allowed.",
        });
    }
    res.json({ a: a, b: b, operation: "divide", output: a / b });
});

app.listen(3000);
