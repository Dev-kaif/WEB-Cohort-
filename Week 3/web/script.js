const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

function circleMouse(){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
    })
}

function firstpageani(){
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

circleMouse();
firstpageani();