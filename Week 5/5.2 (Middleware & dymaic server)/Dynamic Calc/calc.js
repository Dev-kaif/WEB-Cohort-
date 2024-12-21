const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/api", function (req, res) {
  let a = parseInt(req.body.a);
  let b = parseInt(req.body.b);
  let op = req.body.operation;

  if (op === "*") {
    res.json({ a: a, b: b, operation: "multiply", output: a * b });
  }
  if (op === "+") {
    res.json({ a: a, b: b, operation: "add", output: a + b });
  }
  if (op === "-") {
    res.json({ a: a, b: b, operation: "subtract", output: a - b });
  }
  if (op === "/") {
    if (b === 0) {
      return res.status(400).json({
        error: "Division by zero is not allowed.",
      });
    }
    res.json({ a: a, b: b, operation: "divide", output: a / b });
  }
});

app.listen(3000);
