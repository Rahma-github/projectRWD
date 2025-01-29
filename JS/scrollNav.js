window.onscroll = function() { toggleNavbar(); };

function toggleNavbar() {
  const navbar = document.querySelector(".navbar");
  const buttons = document.querySelectorAll('.btn.bg-transparent, .btn.border-light-subtle');
  const span = document.querySelector('.span1');

  if (window.scrollY > 200) {
    navbar.classList.add("scrolled");
    buttons.forEach(btn => btn.style.color = "rgb(3, 3, 3)");
    if (span) span.style.color = "rgb(3, 3, 3)";
  } else {
    navbar.classList.remove("scrolled");
    buttons.forEach(btn => btn.style.color = "white");
    if (span) span.style.color = "aliceblue";
  }
}
