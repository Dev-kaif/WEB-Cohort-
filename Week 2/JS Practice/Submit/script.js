let inps = document.querySelectorAll('input[type="text"]')
let form = document.querySelector("form")
let h4 = document.querySelector("h4")

form.addEventListener("submit", function(ev){
    ev.preventDefault()
    for (let i = 0; i < inps.length; i++) {
        if(inps[i].value.trim() === '') {
           h4.textContent = "Error mf"
           h4.style.color = 'red'
           break; 
        }
        else{
            h4.textContent = "Good going mf"
            h4.style.color = 'yellowGreen'
            break; 
        }
    }
})