document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });

  const form = document.getElementById("signinForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document
      .querySelectorAll(".error")
      .forEach((error) => (error.textContent = ""));

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const job = document.getElementById("job").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

    if (firstName === "") {
      document.getElementById("firstNameError").textContent =
        "First Name is required.";
      isValid = false;
    }

    if (lastName === "") {
      document.getElementById("lastNameError").textContent =
        "Last Name is required.";
      isValid = false;
    }

    if (job === "") {
      document.getElementById("jobError").textContent = "Job is required.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("emailError").textContent =
        "Invalid email format.";
      isValid = false;
    }

    if (password === "") {
      document.getElementById("passwordError").textContent =
        "Password is required.";
      isValid = false;
    }

    if (isValid) {
      const userData = {
        firstName,
        lastName,
        job,
        email,
        password,
      };

      let existingUsers = JSON.parse(localStorage.getItem("users"));

      if (!Array.isArray(existingUsers)) {
        existingUsers = [];
      }

      existingUsers.push(userData);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      console.log("User data saved:", userData);
      console.log("All users:", existingUsers);

      alert("Sign-in data saved successfully!");
      form.reset();
    }
  });
});
