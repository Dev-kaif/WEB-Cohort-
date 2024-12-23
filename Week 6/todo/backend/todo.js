const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let todos = [];
let counter = 0;

app.post("/add-todo", function (req, res) {
  let todo = req.body.todo;
  let id = counter++;

  todos.push({
    todo: todo,
    id: id,
  });

  res.json({ message: "Added new todo" ,todo,id});
});

app.delete("/delete-todo", function (req, res) {
  let delID = Number(req.body.id);
  todos = todos.filter((todo) => todo.id !== delID);

  res.json({ message: "Deleted the todo" });
});


app.put("/todo-update",function(req,res){
    let newTodo = req.body.todo;
    let updateID = Number(req.body.id);
    
    todos = todos.map((item) => ( item.id === updateID ? {...item,todo: newTodo}:item));

    
    let found = todos.find((todo)=>todo.id === updateID)
    
    if (found) {
      res.json({ message: "Updated the todo", todo: found.todo });
    } else {
        res.status(404).json({ message: "Todo not found" });
      }
})





app.listen(3000);
