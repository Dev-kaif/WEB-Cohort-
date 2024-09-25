let img1 = document.querySelector('#swap1')
let img2 = document.querySelector('#swap2')

document.querySelector('button')
.addEventListener('click',function(){
    let src1 = img1.src 
    let src2 = img2.src 

    img1.src = src2
    img2.src = src1
})