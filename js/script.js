document.addEventListener("DOMContentLoaded", function () {
  contactFormValidation();
  homeSlideshow();
});



// 1) CONTACT FORM VALIDATION

function contactFormValidation() {
  var form = document.getElementById("reservationForm");
  var msgBox = document.getElementById("form-message");

  // If we are not on contact page, stop
  if (!form || !msgBox) {
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var guests = document.getElementById("guests").value;

    // reset message box
    msgBox.className = "form-message";
    msgBox.textContent = "";

    // name check
    if (name.length < 2) {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please enter your full name.";
      return;
    }

    // email check (simple)
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please enter a valid email.";
      return;
    }

    // phone check
    if (phone.length < 7) {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please enter a valid phone number.";
      return;
    }

    // date check
    if (date === "") {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please select a date.";
      return;
    }

    // time check
    if (time === "") {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please select a time.";
      return;
    }

    // guests check
    if (guests === "") {
      msgBox.classList.add("error");
      msgBox.textContent = "❌ Please select number of guests.";
      return;
    }

    // success
    msgBox.classList.add("success");
    msgBox.textContent = "✅ Reservation request sent! We will contact you soon.";

 
    alert("Reservation request sent successfully!");

    form.reset();

    // hide message after 5 seconds
    setTimeout(function () {
      msgBox.className = "form-message";
      msgBox.textContent = "";
    }, 5000);
  });
}



// 2) HOME PAGE SLIDESHOW
function homeSlideshow() {
  var slideshow = document.querySelector(".home-slideshow");

  // If we are not on home page, stop
  if (!slideshow) {
    return;
  }

  var img = document.querySelector(".home-slideshow-img");
  var title = document.querySelector(".home-slideshow-title");
  var text = document.querySelector(".home-slideshow-text");
  var prevBtn = document.querySelector(".home-slide-btn.prev");
  var nextBtn = document.querySelector(".home-slide-btn.next");
  var dotsBox = document.querySelector(".home-slide-dots");

  
  var slides = [
    { src: "images/sundayroast.jpg", title: "Sunday Roast", text: "Our signature roast with Yorkshire pudding" },
    { src: "images/fishandchips.jpg", title: "Fish & Chips", text: "Crispy battered fish with chunky chips" },
    { src: "images/shepherdpie.jpg", title: "Shepherd’s Pie", text: "Comfort food baked to perfection" },
    { src: "images/beefsteak.jpg", title: "Beef Steak", text: "Grilled sirloin steak with pepper sauce and fries" },
    { src: "images/steaksandwich.jpg", title: "Steak Sandwich", text: "Grilled steak with caramelized onions" },
    { src: "images/stickytoffeepudding.jpg", title: "Sticky Toffee Pudding", text: "A sweet finish to your meal" },
    { src: "images/prawncocktail.jpg", title: "Prawn Cocktail", text: "Classic Marie Rose sauce with lettuce" },
    { src: "images/scotcheggs.jpg", title: "Scotch Eggs", text: "Seasoned sausage meat and breadcrumbs" }
  ];

  var current = 0;
  var timer;

  // create dots
  dotsBox.innerHTML = "";
  for (var i = 0; i < slides.length; i++) {
    var dot = document.createElement("button");
    dot.className = "home-dot";
    dot.setAttribute("type", "button");

    // store the number inside the dot
    dot.setAttribute("data-num", i);

    dot.addEventListener("click", function () {
      current = Number(this.getAttribute("data-num"));
      showSlide();
      restartTimer();
    });

    dotsBox.appendChild(dot);
  }

  function showSlide() {
    img.src = slides[current].src;
    img.alt = slides[current].title;

    title.textContent = slides[current].title;
    text.textContent = slides[current].text;

    // activate dot
    var allDots = document.querySelectorAll(".home-dot");
    for (var j = 0; j < allDots.length; j++) {
      allDots[j].classList.remove("active");
    }
    allDots[current].classList.add("active");
  }

  function nextSlide() {
    current++;
    if (current >= slides.length) {
      current = 0;
    }
    showSlide();
  }

  function prevSlide() {
    current--;
    if (current < 0) {
      current = slides.length - 1;
    }
    showSlide();
  }

  function startTimer() {
    timer = setInterval(function () {
      nextSlide();
    }, 3500);
  }

  function restartTimer() {
    clearInterval(timer);
    startTimer();
  }

  nextBtn.addEventListener("click", function () {
    nextSlide();
    restartTimer();
  });

  prevBtn.addEventListener("click", function () {
    prevSlide();
    restartTimer();
  });

  // start
  showSlide();
  startTimer();
}