// In JavaScript or TypeScript, the value of a `const` cannot be reassigned.
// However, if the `const` is an array or an object, its internal properties can still be modified.



// Example with a `const` array:
const arr = [1, 2, 3, 4];
arr[0] = 10; // This is allowed because we are modifying the internal state of the array.
console.log(arr); // Output: [10, 2, 3, 4]

// To prevent such modifications, we can use the `readonly` utility in TypeScript.
// The `readonly` modifier makes properties immutable, so they cannot be changed after initialization.
// genrally used to make api and apikeys immutable

type Person = {
    // `readonly` ensures this property cannot be reassigned
    readonly name: string; 
    readonly age: number; 
};

const person: Person = {
    name: "Kali",
    age: 25,
};


// Trying to modify a readonly property results in a compile-time error.
// Error: Cannot assign to 'name' because it is a read-only property.
person.name = "John"; 
person.age = 30;     



// Another way to write the syntax:
// If you don't want to manually mark every property as `readonly`, you can make the entire object/array readonly.

type Person2 = {
    name: string;
    age: number;
};

// Using `Readonly` utility to make all properties readonly
const person2: Readonly<Person2> = {
    name: "Kali",
    age: 25,
};

person2.name = "John"; 
person2.age = 30;   
