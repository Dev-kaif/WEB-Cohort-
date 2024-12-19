const express = require('express');
const app = express();
let users = []; 

// Create a new user (POST)
app.post('/', function (req, res) {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1, 
    name,
    email,
  };

  users.push(newUser);
  res.json({ message: 'User created', user: newUser });
});

// Delete a user by ID (DELETE)
app.delete('/:id', function (req, res) {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.json({ message: 'User deleted', user: deletedUser[0] });
});

app.listen(3001);
