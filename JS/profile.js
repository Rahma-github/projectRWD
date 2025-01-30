function toggleContactInfo() {
  const content = document.getElementById("contact-content");
  const arrow = document.getElementById("contact-arrow");
  content.classList.toggle("d-none");
  arrow.classList.toggle("rotate");
}

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".q-suggest");
  const contentContainer = document.querySelector(".content-container");
  const icon = toggleBtn.querySelector(".icon");

  toggleBtn.addEventListener("click", function () {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";

    toggleBtn.setAttribute("aria-expanded", !isExpanded);

    if (isExpanded) {
      contentContainer.style.maxHeight = "0";
      icon.textContent = "+";
      toggleBtn.classList.remove("open");
      contentContainer.style.border = "none";
    } else {
      contentContainer.style.maxHeight = contentContainer.scrollHeight + "px";
      icon.textContent = "-";
      toggleBtn.classList.add("open");
      contentContainer.style.border = "1px solid #ccc";
    }
  });
});

let menu = document.getElementById("menu");
let dropmenu = document.getElementsByClassName("dropmenu")[0];
menu.addEventListener("click", () => {
  dropmenu.classList.toggle("d-none");
});

document.addEventListener("click", (event) => {
  if (!dropmenu.contains(event.target) && !menu.contains(event.target)) {
    dropmenu.classList.add("d-none");
  }
});
