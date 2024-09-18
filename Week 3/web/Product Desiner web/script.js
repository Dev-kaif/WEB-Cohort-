const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function fristPageAnimation() {
  let tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from(".bottom", {
      y: -10,
      opacity: 0,
      delay: -1,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
}

let timeout;
function circlesquiz() {
  // define defsult scale value
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);

    let xdiff = details.clientX - xprev;
    xprev = details.clientX;

    let ydiff = details.clientY - yprev;
    yprev = details.clientY;

    // clamp = Clamp a value to fit within a specific range (ex: clamp(0, 100, -12) --> 0)
    xscale = gsap.utils.clamp(0.7, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.7, 1.2, ydiff);

    circlemousefolower(xscale, yscale);

    timeout = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circlemousefolower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale},${yscale})`;
  });
}

fristPageAnimation();
circlemousefolower();
circlesquiz();

document.querySelectorAll(".elem").forEach(function (elem) {
  let rotate = 0;
  let diffRoatate = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power1,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (details) {
    // getBoundingClientRect() = gives info of the elements its attached to for example its distance from the Top
    let diff = details.clientY - elem.getBoundingClientRect().top;

    diffRoatate = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-15, 15, diffRoatate * 0.8),
    });
  });
});

function addUnderlineClass(selector) {
  document.querySelectorAll(selector).forEach(function (element) {
    element.classList.add("underline");
  });
}

addUnderlineClass(".under");

function updateTime() {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata", // Adjust to your time zone
    hour12: true,
  };
  const timeString = now.toLocaleTimeString("en-US", options);

  document.getElementById("time").textContent = `${timeString} IST`;
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 60000);

function dropdownAnimation(){
    let drop = gsap.timeline();
    drop.to(".dropi", {
        y: 0,
        duration: 1.7,
        ease: Expo.easeInOut,
        delay: -1,
        stagger: 0.2,
      })
}

function menu() {
    document.querySelector("#nav div").innerHTML = `<div class="dropdown">
        <div class="bounding">
            <div class="dropi underline">THE PLUG</div>
        </div>
        <div class="bounding">
            <div class="dropi underline">INEXPERIENCE</div>
        </div>
        <div class="bounding">
            <div class="dropi underline">HUDU</div>
        </div>
        <div class="bounding">
            <div class="dropi underline">PLAYGROUND</div>
        </div>
        <div class="bounding">
            <div class="dropi underline">CONTACT</div>
        </div>
    </div>`;
    dropdownAnimation();
}

