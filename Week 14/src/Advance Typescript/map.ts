// Another way to create and manage objects in JavaScript is by using the `Map` class.
// The `Map` class is a built-in data structure that allows key-value pairs.

// Syntax to create a new `Map` instance:
const users__ = new Map();

// The `Map` class provides methods like:
// - `.set(key, value)` to add or update key-value pairs.
// - `.get(key)` to retrieve the value associated with a specific key.
// - `.has(key)` to check if a key exists.
// - `.delete(key)` to remove a key-value pair.

// In TypeScript, we can define the types for keys and values in the `Map`.

type _User_ = {
    name: string;
    age: number;
};

// The first argument defines the type of keys, and the second defines the type of values.
const users_ = new Map<string, _User_>();

// Using `.set()` to add key-value pairs:
users_.set("user1", { name: "Alice", age: 25 });
users_.set("user2", { name: "Ali", age: 19 });

// Using `.get()` to retrieve a value by its key:
const user_ = users_.get("user1");

console.log(user_); // Output: { name: 'Alice', age: 25 }

// Additional `Map` operations:

// Check if a key exists:
console.log(users_.has("user1")); // Output: true
console.log(users_.has("user3")); // Output: false

// Delete a key-value pair:
users_.delete("user2");
console.log(users_.has("user2")); // Output: false

// Iterating over a `Map`:
users_.forEach((value, key) => {
    console.log(`${key}: ${JSON.stringify(value)}`);
});
// Output:
// user1: {"name":"Alice","age":25}

// Get the size of the `Map`:
console.log(users_.size); // Output: 1
