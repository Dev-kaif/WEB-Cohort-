// abstarct class interface allows us to define the type of methods/parameters
// however its diffrent than interface because interface is implemented 
// while abstact is class which extendes which allows us to give addition default methods to the class whereever it extends



// Abstract class User
// They can contain both abstract methods (without implementation) and concrete methods (with implementation).
abstract class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Abstract method: Must be implemented by any class extending User
    abstract greet: () => string;

    // Concrete method: Provides a default implementation that can be inherited as is
    hello = () => {
        console.log("hello");
    };
}

// The Engineer class extends the abstract class User
// This means it must implement all abstract methods from User (e.g., greet)
class Engineer extends User {
    name: string;

    constructor(name: string) {
        super(name); // Call the constructor of the parent abstract class
        this.name = name;
    }

    // Implementation of the abstract greet method
    greet = () => {
        return "hello, " + this.name;
    };
}

// Creating an instance of the Engineer class
let newEngineer = new Engineer("Kaif");

// Calling the greet method implemented in the Engineer class
let newGreet = newEngineer.greet();

// Calling the hello method inherited from the abstract class
newEngineer.hello();

console.log(newGreet); // Output: hello, Kaif

// Explanation:
// Abstract classes act as a blueprint for derived classes. 
// They allow us to define the type and structure of methods and properties (like an interface).
// However, unlike interfaces, abstract classes can have concrete methods with default implementations 
// (e.g., the hello method in this example).
