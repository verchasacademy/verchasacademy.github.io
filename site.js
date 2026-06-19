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
});
