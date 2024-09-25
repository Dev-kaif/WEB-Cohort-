let prog = document.querySelector('#progress')
let h3 = document.querySelector('h3')

let count = 0
var int = setInterval(function(){
    if(count == 100){
        h3.innerText = "Downloaded"
        clearInterval(int)
    }
    count++ 
    prog.style.width = count+'%'
},100)