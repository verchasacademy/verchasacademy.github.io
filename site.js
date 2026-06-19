document.addEventListener("DOMContentLoaded", function(){
  const courseCards = document.querySelectorAll(".course-card[data-course]");
  const courseInfo = document.getElementById("course-info");
  const coursePanels = document.querySelectorAll(".course-info-panel[data-info]");

  function showCourseInfo(courseName){
    courseCards.forEach(card => {
      const isActive = card.dataset.course === courseName;
      card.classList.toggle("active", isActive);
      card.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    coursePanels.forEach(panel => {
      panel.classList.toggle("active", panel.dataset.info === courseName);
    });

    if(courseInfo){
      courseInfo.classList.add("show");
    }
  }

  courseCards.forEach(card => {
    card.addEventListener("click", () => showCourseInfo(card.dataset.course));
    card.addEventListener("keydown", event => {
      if(event.key === "Enter" || event.key === " "){
        event.preventDefault();
        showCourseInfo(card.dataset.course);
      }
    });
  });
document.addEventListener("click", function(event){

  if(event.target.closest(".course-card[data-course]")) return;

  if(event.target.closest("#course-info")) return;

  courseInfo.classList.remove("show");

  courseCards.forEach(card => {
    card.classList.remove("active");
    card.setAttribute("aria-expanded","false");
  });

  coursePanels.forEach(panel => {
    panel.classList.remove("active");
  });

});
  const fadeElements = document.querySelectorAll(".fade-in");
  if("IntersectionObserver" in window){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add("show");
        }
      });
    }, {
      threshold: 0.15
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add("show"));
  }

  const slides = document.querySelectorAll(".slide");
  if(slides.length){
    let index = 0;
    slides[0].classList.add("active");

    function showSlide(){
      const current = slides[index];
      index = (index + 1) % slides.length;
      const next = slides[index];

      if(next.complete){
        current.classList.remove("active");
        next.classList.add("active");
      } else {
        next.onload = () => {
          current.classList.remove("active");
          next.classList.add("active");
        };
      }
    }

    setInterval(showSlide, 3000);
  }
const courses = document.querySelector(".courses");
const track = document.querySelector(".courses-track");

if(courses && track){

  courses.addEventListener("touchstart", () => {
    track.style.animationPlayState = "paused";
  }, { passive:true });

  courses.addEventListener("touchend", () => {
    track.style.animationPlayState = "running";
  }, { passive:true });

}
const testimonialSlider = document.querySelector(".testimonial-slider");
const testimonialTrack = document.querySelector(".testimonial-track");

if(testimonialSlider && testimonialTrack){

  testimonialSlider.addEventListener("touchstart", () => {
    testimonialTrack.style.animationPlayState = "paused";
  }, { passive:true });

  testimonialSlider.addEventListener("touchend", () => {
    testimonialTrack.style.animationPlayState = "running";
  }, { passive:true });

}
/* =========================
   AUTO SCROLL + DRAG
========================= */

function setupInfiniteCarousel(wrapperSelector, trackSelector, speed){

  const wrapper = document.querySelector(wrapperSelector);
  const track = document.querySelector(trackSelector);

  if(!wrapper || !track) return;

  let position = 0;
  let isDragging = false;
  let isPaused = false;
  let lastX = 0;

  function animate(){

    if(!isDragging && !isPaused){

      position -= speed;

      const halfWidth = track.scrollWidth / 2;

      if(Math.abs(position) >= halfWidth){
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  /* Desktop hover pause */
  wrapper.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  wrapper.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  function dragStart(x){
    isDragging = true;
    lastX = x;
  }

  function dragMove(x){

    if(!isDragging) return;

    const delta = x - lastX;

    position += delta;

    track.style.transform = `translateX(${position}px)`;

    lastX = x;
  }

  function dragEnd(){
    isDragging = false;
  }

  /* Mobile */
  wrapper.addEventListener("touchstart", e => {
    dragStart(e.touches[0].clientX);
  }, {passive:true});

  wrapper.addEventListener("touchmove", e => {
    dragMove(e.touches[0].clientX);
  }, {passive:true});

  wrapper.addEventListener("touchend", dragEnd);

  /* Desktop drag */
  wrapper.addEventListener("mousedown", e => {
    dragStart(e.clientX);
  });

  window.addEventListener("mousemove", e => {
    dragMove(e.clientX);
  });

  window.addEventListener("mouseup", dragEnd);
}

/* Courses */
setupInfiniteCarousel(
  ".courses",
  ".courses-track",
  0.4
);

/* Testimonials */
setupInfiniteCarousel(
  ".testimonial-slider",
  ".testimonial-track",
  0.25
);
});
