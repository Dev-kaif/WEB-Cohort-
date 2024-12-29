// In TypeScript, functions are defined similarly to JavaScript, with the added advantage of type annotations.
// These type annotations allow us to explicitly define the types of function parameters and return values.

// To define a function in TypeScript, we specify the function name, parameters, and the return type (if any).

// Here is the syntax for defining a function with a parameter that has a type annotation:

// 'a: string' means the parameter 'a' must be of type 'string'
function stringGreet(a: string): void {  // 'void' means the function doesn't return anything
    console.log("Hello, " + a); 
}

// We can define another function that accepts a number as a parameter:
// 'a: number' means the parameter 'a' must be of type 'number'
function numGreet(a: number): void {  // 'void' means the function doesn't return anything
    console.log("Hello, " + a); 
}

// TypeScript also allows using a **union type** to accept multiple types for a parameter.
// Here, 'a: string | number' means the parameter 'a' can either be a string or a number.

function numOrstringGreet(a: string | number): void {  // 'void' means the function doesn't return anything
    console.log("Hello, " + a); 
}

// In TypeScript, we explicitly define the type of the parameter 'a' as either a 'string' or a 'number'.
// This union type allows the function to accept either a string or a number, and TypeScript will enforce type checking.

stringGreet("Kaif");  // Correct usage: Passing a string to the 'greet' function
numGreet(123);  // Correct usage: Passing a number to the 'numGreet' function
numOrstringGreet(456);  // Correct usage: Passing a number to the 'numOrstringGreet' function
numOrstringGreet("Kaif");  // Correct usage: Passing a string to the 'numOrstringGreet' function

// TypeScript will throw an error if you try to pass a non-accepted type:
// greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
// numGreet("Kaif"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// -----------------------------

// Now, let's explore using the 'any' type, which disables type checking for that parameter.

// The 'any' type allows a parameter to accept any type of value (string, number, object, etc.).
// It essentially disables type safety for that parameter, meaning TypeScript will not catch errors if an unexpected type is passed.

function Anygreet(a: any): void {  // 'a' can be any type
    console.log("Hello, " + a); 
}

// Example of calling the Anygreet function with a number (which would have caused an error in the 'greet' function):
Anygreet(123);  // Output: "Hello, 123"

// The 'any' type allows for greater flexibility, but at the cost of type safety.
// It is useful when you are uncertain of the type, but it is recommended to use it sparingly in favor of more specific types.

function sum(a:number ,b:number):number {
    return a+b;
}
let ans = sum(8,1);

console.log(ans);




function delayedCall(fun: () => void){
 setTimeout(fun,1000)
}


delayedCall(()=>console.log("hello"));