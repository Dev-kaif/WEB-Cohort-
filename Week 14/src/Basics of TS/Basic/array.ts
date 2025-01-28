// This is how we define the type of an array in TypeScript:
// - `number[]`: An array of numbers
// - `string[]`: An array of strings

// Function to double the values in a number array
function Twotable(nums: number[]): number[] { // Parameter 'nums' is a number array, and the function returns a number array

    let doubledArray = nums.map((num) => num * 2);
    return doubledArray;
}

let table = Twotable([1, 2, 3, 4, 5]); 
console.log(table); 
    