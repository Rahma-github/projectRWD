
document.getElementById("forgotPasswordForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email").value;
    const errorMessage = document.getElementById("errorMessage");

    if (!emailInput) {
      alert("Please enter your email address.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === emailInput);

    if (userExists) {
      alert("A password reset link has been sent to your email.");
      window.location.href = "./resetPassword";
    } else {
      errorMessage.textContent = "Email address not found.";
      errorMessage.style.display = "block";
    }
  });
