
function locomotiveAnimationGSAP(){
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('main'),
//   smooth: true
// });

  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    smooth: true,
    el: document.querySelector("main")
  });
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
  });

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


}

locomotiveAnimationGSAP();

function videoContainerAnimation(){
  const videoContainer = document.querySelector(".video-container");
  const play = document.querySelector(".play")

  videoContainer.addEventListener("mouseenter", function(){
    gsap.to(play , {
      scale: 1,
      opacity: 1,

    })
  })

  videoContainer.addEventListener("mouseleave", function(){
    gsap.to(play , {
      scale: 0,
      opacity: 0,
    })
  })

  videoContainer.addEventListener("mousemove", function(dets){
    gsap.to(play , {
      left: dets.x - 80,
      top: dets.y - 70,
    })
  })
}

videoContainerAnimation();

function loadingAnimation(){
  gsap.from(".page1 h1", {
    y: 100,
    opacity: 0,
    duration: 0.9,
    stagger: 0.3,
    delay: 2.5,
  })

  gsap.from(".page1 .video-container", {
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    delay: 2.3,
  })
}

loadingAnimation();

function cursorAnimation(){

  document.addEventListener("mousemove", function (dets){
    gsap.to(".cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  document.querySelectorAll(".child").forEach(function (elem){
    elem.addEventListener("mouseenter", function(){
      gsap.to(".cursor", {
        transform: 'translate(-50%, -50%) scale(1)',
      });
    });

    elem.addEventListener("mouseleave", function(){
      gsap.to(".cursor", {
        transform: 'translate(-50%, -50%) scale(0)',
      });
    });

  });
}

cursorAnimation();

function navbarAnimation(){

  gsap.to(".nav-logo svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: ".page1",
      scrub: true,
      scroller: "main",
      start: "top 0",
      end: "top -5%",
    }
  })

  gsap.to(".nav-right .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scrub: true,
      scroller: "main",
      start: "top 0",
      end: "top -5%",
    }
  })
}

navbarAnimation();

function iconAnimation(){
  let cart = document.querySelector("#cart");
  
  cart.addEventListener("mouseover", function (){
    gsap.to("#cart", {
      rotation: 90,
      // duration: 0.3,
    })
  })
}

// iconAnimation();

// gsap.to("#cart", {
//   color: "red",
//   rotation: 90,
// })