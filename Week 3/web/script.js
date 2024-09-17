const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function  fristPageAnimation(){

    let tl =gsap.timeline();
    
    tl.from("#nav" ,{
        y: -10,
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y: 0,
        duration:1.5,
        ease:Expo.easeInOut,
        delay: -1,
        stagger: .2
    })
    .from(".bottom" ,{
        y: -10,
        opacity:0,
        delay: -1,
        duration:1.5,
        ease:Expo.easeInOut
    })
}

let timeout
function circlesquiz(){
    // define defsult scale value
    let xscale = 1;
    let yscale = 1;
    
    let xprev = 0;
    let yprev = 0;
    
    window.addEventListener("mousemove", function(dets){

        clearTimeout(timeout)

        let xdiff = dets.clientX - xprev;
        xprev = dets.clientX;
        
        let ydiff = dets.clientY - yprev;
        yprev = dets.clientY;
        
        // clamp = Clamp a value to fit within a specific range (ex: clamp(0, 100, -12) --> 0)
        xscale = gsap.utils.clamp(0.7,1.2,xdiff)
        yscale = gsap.utils.clamp(0.7,1.2,ydiff)

        circlemousefolower(xscale,yscale);

        timeout = setTimeout(()=>{
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`
        },100)

    })
}


function circlemousefolower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}


 fristPageAnimation();
circlemousefolower();
circlesquiz();

