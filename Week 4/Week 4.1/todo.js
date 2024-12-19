const fs = require("fs");
const { Command } = require("commander");

const program = new Command();

program
  .name("Add")
  .description("Add or delete tasks from the TODO list")
  .version("0.2.5");

program
  .command("add")
  .description("Add a new task to the TODO list")
  .argument("<task>", "Task to add")
  .action((todo) => {
    fs.appendFile("todo.txt", todo + "\n", "utf8", (err) => {
      if (err) {
        console.error("An error occurred while adding the task:", err);
      } else {
        console.log(`Task "${todo}" added to the TODO list.`);
      }
    });
  });

program
  .command("delete")
  .description("Delete a specific task from the TODO list")
  .argument("<task>", "Task to delete")
  .action((task) => {
    fs.readFile("todo.txt", "utf8", (err, data) => {
      if (err) {
        console.error("An error occurred while reading the file:", err);
        return;
      }

      let tasks = data.split("\n");

      const filteredTasks = tasks.filter((t) => t.trim() !== task);

      const updatedData = filteredTasks.join("\n");

      fs.writeFile("todo.txt", updatedData, "utf8", (err) => {
        if (err) {
          console.error("An error occurred while writing to the file:", err);
        } else {
          console.log(`Task "${task}" has been deleted from the TODO list.`);
        }
      });
    });
  });

program
  .command("show")
  .description("Show list of task from the TODO list")
  .action(() => {
    fs.readFile("todo.txt", "utf8", (err, data) => {
      if (err) {
        console.error("An error occurred while reading the file:", err);
        return;
      }
      let tasks = data.trim().split("\n");
      const show = tasks.join("\n");
      console.log(show)
    });
  });

program.parse(process.argv);
