const express = require("express");
const app = express();


// middleware 
function middleware (req, res, next){
    let data = {
        method : req.method,
        url : req.url,
        timestamp : new Date().toISOString(),
    }
    console.log(data)
    next();
}


// main function
function multiply(req, res) {
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    res.json({ a: a, b: b, operation: "multiply", output: a * b });
}
function add(req, res) {
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    res.json({ a: a, b: b, operation: "add", output: a + b });
}

app.use(middleware)
app.get("/multiply/:a/:b",multiply);

app.get("/add/:a/:b", add);


app.listen(3000);
