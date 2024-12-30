// Defining a type for user information
type userInfo = {
    name: string;
    age: number;
};

// Defining a complex object where keys are strings and values are of type `userInfo`.
// while writing the tyoe for the complex object ,it can be a messy and hard to look at syntax
// This can result in a verbose and less readable syntax.
type User_1 = {
    [key: string]: userInfo; // The key is of type string, and the value is of type `userInfo`.
};

// To simplify the syntax, we can use the `Record` utility type provided by TypeScript.

// Using the `Record` utility:
// - The first argument defines the type of the keys.
// - The second argument defines the type of the values.
type User_ = Record<string, userInfo>;

// Example object of type `User_`
const users: User_ = {
    "user1": { name: "Alice", age: 25 },
    "user2": { name: "Bob", age: 30 },
};

console.log(users);
