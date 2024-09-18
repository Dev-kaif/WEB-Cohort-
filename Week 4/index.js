// prints the current location which we are in 
console.log(__dirname)
// output = c:\Users\Kaifg\OneDrive\Desktop\Cohort 3\Week 4


// In path library, path.join lets you join two or more path togther 
const path = require("path")
console.log(path.join(__dirname,"index.js"))
console.log(path.join(__dirname,"index.js","hello.js","mor.html"))




