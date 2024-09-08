function setTimeoutPromisified(duration){
    return new Promise( function(resolve){
        setTimeout(resolve,duration);
    });
}

// one way to do //
setTimeoutPromisified(1000).then(()=>{
    console.log("hi");
    setTimeoutPromisified(2000).then(()=>{
        console.log("hello");
        setTimeoutPromisified(3000).then(()=>{
            console.log("hellow");
        })
    })
})

// other way to do it :  Promis Chainning //
setTimeoutPromisified(1000).then(()=>{
    console.log("hi");
    return setTimeoutPromisified(2000)
}).then(()=>{
    console.log("hello");
    return setTimeoutPromisified(3000);
}).then(()=>{
    console.log("hellow");
})


// channing //
// let str = "kaif"
// const sortedstr = str.split("").sort().join("")
// console.log(sortedstr)
