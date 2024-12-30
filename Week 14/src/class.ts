// Define the People interface
// This interface sets a contract that any implementing class must have 'name', 'age', and 'isLegal' properties.
interface People {
    name: string;
    age: number;
    isLegal: () => boolean; // Method to check if the person is of legal age
}

// The Manager class implements the People interface.
// By doing so, the Manager class is required to have 'name', 'age', and 'isLegal' properties/methods.
// Additional properties or methods can be added, but the interface's requirements cannot be removed.
class Manager implements People {

     // The `public` keyword in the constructor automatically declares and assigns 
    // class properties (name and age) to the instance. It saves us from explicitly 
    // writing separate property declarations and assignments.
    constructor(public name: string, public age: number) {}

    // Implementation of the isLegal method from the People interface
    isLegal() {
        return this.age > 18;
    }
}

// Creating an instance of the Manager class
let newUser = new Manager("Kali", 19);

console.log(newUser.isLegal()); 

// We can perform similar operations with plain objects
// For example, creating an object that adheres to the People interface
let newObject: People = {
    name: "Lina",
    age: 17,
    isLegal: function () {
        return newObject.age > 18;
    }
};

console.log(newObject.isLegal()); 


// However, we can extend classes but not objects.
// Example of class extension:
class SeniorManager extends Manager {

    constructor(public name: string, public age: number,public department: string) {
        super(name, age); // Call the parent class constructor
    }

    // Adding a new method specific to SeniorManager
    getDetails() {
        return `${this.name} manages the ${this.department} department.`;
    }
}

// Creating an instance of the SeniorManager class
let senior = new SeniorManager("Alex", 30, "IT");
console.log(senior.getDetails()); // Output: Alex manages the IT department.
