async function add() {
  let todo = document.getElementById("todo-input").value;
  
  if (!todo.trim()) {
    alert('Please enter a valid todo.');
    return;
  }

  try {
    let response = await axios.post("http://localhost:3000/add-todo", { todo });

    document.getElementById(
      "todo-list"
    ).innerHTML += `<div id="${response.data.id}" class="todo-item">
      <div  id="fun_${response.data.id}">${response.data.todo}</div>
    <div class="multi-btn">
    <div id="up_${response.data.id}">
    <button onclick="edit('fun_${response.data.id}','up_${response.data.id}',${response.data.id})" class="update-btn">Edit</button>
    </div>
    <button onclick="del(${response.data.id})" class="delete-btn">✖</button>
    </div>
  </div>`;

    document.getElementById("message").innerText = response.data.message;
    setTimeout(() => {
      document.getElementById("message").innerText = "";
    }, 2000);
  } catch (error) {
    console.error('Error adding todo:', error);
    alert('There was an error adding the todo.');
  }
}

async function del(id) {
  try {
    let response = await axios.delete("http://localhost:3000/delete-todo", {
      data: { id },
    });

    const element = document.getElementById(id);
    element.remove();
    document.getElementById("message").innerText = response.data.message;

    setTimeout(() => {
      document.getElementById("message").innerText = "";
    }, 1000);
  } catch (error) {
    console.error('Error deleting todo:', error);
    alert('There was an error deleting the todo.');
  }
}

function edit(id1, id2, id3) {
  document.getElementById(id1).innerHTML = '<input id="input-edit" type="text" placeholder="update task...">';
  document.getElementById(id2).innerHTML = `<button onclick="update(${id3})" class="update-btn">Update</button>`;
}

async function update(id) {
  let newTodo = document.getElementById("input-edit").value;
  
  // Input validation
  if (!newTodo.trim()) {
    alert('Please enter a valid updated todo.');
    return;
  }

  try {
    const response = await axios.put('http://localhost:3000/todo-update', {
      id: id,
      todo: newTodo,
    });

    document.getElementById(`fun_${id}`).innerHTML = `<div id="fun_${id}">${response.data.todo}</div>`;
    document.getElementById(`up_${id}`).innerHTML = `<button onclick="edit('fun_${id}','up_${id}',${id})" class="update-btn">Edit</button>`;
    document.getElementById("message").innerText = response.data.message;

    setTimeout(() => {
      document.getElementById("message").innerText = "";
    }, 1000);
  } catch (error) {
    console.error('Error updating todo:', error);
    alert('There was an error updating the todo.');
  }
}
