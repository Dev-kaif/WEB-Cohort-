const express = require('express');
const app = express();
const fs = require('fs');

// Middleware to parse JSON body
app.use(express.json());

let todos = [];
let idCounter = 0;

// Route to add a new to-do
app.post("/add-todo", function(req, res) {
    let todo = {
        id: idCounter++,
        todo: req.body.todo
    }
    todos.push(todo);
    console.log(todos);
    
    fs.writeFile("todo.json", JSON.stringify(todos), function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send("Server Error");
        }
        res.send("Todo added successfully");
    });
});

app.delete("/delete-todo/:id", function(req, res) {
    let deleteTodoId = parseInt(req.params.id);  

    todos = todos.filter(todo => todo.id !== deleteTodoId);

    fs.writeFile("todo.json", JSON.stringify(todos), function(err) {
        if (err) {
            console.log(err);
            return res.status(500).send("Server Error");
        }
        res.send("Todo deleted successfully");
    });
});

app.listen(3000);
