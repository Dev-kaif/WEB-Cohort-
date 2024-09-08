const fs = require('fs');

// function readFilePromise(resolve,reject){
//     fs.readFile('file.txt', 'utf8', (err, data)=> {
//         if(err){
//             reject(err)
//         }else{
//             resolve(data);
//         }
//     });
// }

// function readFile(){
//     return new Promise(readFilePromise)
// }


function readFile(){
    return new Promise((resolve,reject)=>{
        fs.readFile('file.txt', 'utf8', (err, data)=> {
            if(err){
                reject(err)
            }else{
                resolve(data);
            }
        });
    });
}

// function callback(data){
//     console.log(data);
// }

// const p = readFile();

// p.then(callback);

readFile().then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err)
})