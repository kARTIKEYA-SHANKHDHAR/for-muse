// Login page logic - check email and password, then show a message

var form = document.getElementById("loginForm");
var email = document.getElementById("email");
var password = document.getElementById("password");
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passwordError");
var success = document.getElementById("formSuccess");
var info = document.getElementById("formInfo");

// Show / hide password
document.getElementById("togglePassword").addEventListener("click", function () {
  var show = password.type === "password";
  password.type = show ? "text" : "password";
  document.getElementById("eyeOpen").style.display = show ? "none" : "";
  document.getElementById("eyeClosed").style.display = show ? "" : "none";
});

// Forgot password
document.getElementById("forgotLink").addEventListener("click", function (e) {
  e.preventDefault();
  info.textContent = "Please enter your email above, and a reset link will be sent to it.";
  info.classList.add("show");
});

// On submit: check both fields
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Email must have @ and a dot after it
  if (!email.value.includes("@") || !email.value.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.classList.add("show");
    return;
  }
  emailError.classList.remove("show");

  // Password must be at least 6 characters
  if (password.value.length < 6) {
    passError.textContent = "Password must be at least 6 characters long.";
    passError.classList.add("show");
    return;
  }
  passError.classList.remove("show");

  // Both are fine. This is only a demo login - there is no real account
  // check on the server. We save just the email, never the password.
  var user = { email: email.value.trim() };
  localStorage.setItem("weddingUser", JSON.stringify(user));
  success.textContent = "Login successful! Welcome back. (Demo login only - not real authentication.)";
  success.classList.add("show");
});
