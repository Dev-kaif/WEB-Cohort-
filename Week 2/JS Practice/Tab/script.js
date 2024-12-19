let divs = document.querySelectorAll('.tab')
let text = document.querySelectorAll('h4')

text[0].style.display= "block"
text[0].style.width= "60%"

// to show the required tab when clicked

divs.forEach(function(div,index){
    div.addEventListener("click",function(){
        hideAll()
        text[index].style.display= "block"
        text[index].style.width= "60%"
    })
})

// to hide the previous all text

function hideAll(){
    text.forEach(function(text){
        text.style.display="none"
    })
}