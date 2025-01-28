// The `greet` function accepts a parameter `user` which is an object.
// The structure of the object is explicitly defined inline, requiring two properties: 
// 'name' (a string) and 'age' (a number).
function greet(user: { 
    name: string; 
    age: number; 
}): void {
    console.log("Hello, " + user.name);  // Logs a personalized greeting using the 'name' property.
}

// Call the `greet` function with an object matching the required structure.
greet({ name: "Kaif", age: 26 }); // Output: "Hello, Kaif"

// -----------------------------

// An `interface` defines the structure of an object in TypeScript.
// It enforces a specific structure and allows for reusability and type-checking.
interface userInterface {
    firstName: string;  // Property 'firstName' must be a string
    age: number;        // Property 'age' must be a number
}

// A `type` also defines the structure of an object, similar to an `interface`.
// The syntax differs slightly but serves the same purpose in this case.
type userType = {
    firstName: string;  // 'firstName' must be a string
    age: number;        // 'age' must be a number
};

// Create an object `user` of type `userType`.
// This ensures the object matches the defined structure.
let user: userType = {
    firstName: "Kaif",  // Assigning the required 'firstName' property
    age: 25             // Assigning the required 'age' property
};

// -----------------------------

// `type` can define unions, allowing a variable to accept multiple types.
type StringOrNumber = number | string;  // This can hold either a number or a string.

// Example of an intersection type:
// Intersection combines multiple types into one. 
// Here, `TeamLead` must have all properties of `Manager` and `Employee`.
interface Manager {
    name: string;
    age: number;
}

interface Employee {
    name: string;
    department: string;
}

type TeamLead = Manager & Employee; // Combines Manager and Employee types

// Creating an object of type `TeamLead`:
let variable: TeamLead = {
    name: "Kalu",        // `name` from both Manager and Employee
    age: 44,             // `age` from Manager
    department: "IT"     // `department` from Employee
};

console.log(variable); // Logs the object: { name: "Kalu", age: 44, department: "IT" }

// -----------------------------

// Key Differences Between `interface` and `type`:
// 1. `interface` can be extended or implemented by classes, while `type` is more flexible for unions and intersections.
// 2. Use `interface` for object shapes, especially if inheritance is needed.
// 3. Use `type` for unions, intersections, or advanced type constructs.
