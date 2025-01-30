const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  this.querySelector("i").classList.toggle("fa-eye");
  this.querySelector("i").classList.toggle("fa-eye-slash");
});
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document
    .querySelectorAll(".error")
    .forEach((error) => (error.textContent = ""));

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;

  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required.";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").textContent =
      "Password is required.";
    isValid = false;
  }

  if (isValid) {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    console.log("Stored users:", storedUsers);

    if (Array.isArray(storedUsers)) {
      const user = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      console.log("Found user:", user);

      if (user) {
        alert("Login successful!");
        window.location.href = "./home.html";
      } else {
        document.getElementById("loginError").textContent =
          "Invalid email or password.";
      }
    } else {
      document.getElementById("loginError").textContent = "No users found.";
    }
  }
});
