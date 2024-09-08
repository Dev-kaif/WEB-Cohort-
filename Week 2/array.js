let arr = [{
    name: "Kaif",
    age: 21
}, {
    name: "Rohan",
    age: 24
}, {
    name: "Yash",
    age: 15
}]

function age(arr) {
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].age >= 18) {
            arr2.push(arr[i])
        }
    }
    return arr2;
}
console.log(age(arr))