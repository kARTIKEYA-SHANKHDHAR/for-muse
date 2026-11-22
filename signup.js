// Signup page logic - check name, email and password, then show a message

var form = document.getElementById("signupForm");
var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passwordError");
var success = document.getElementById("formSuccess");

// Show / hide password
document.getElementById("togglePassword").addEventListener("click", function () {
  var show = password.type === "password";
  password.type = show ? "text" : "password";
  document.getElementById("eyeOpen").style.display = show ? "none" : "";
  document.getElementById("eyeClosed").style.display = show ? "" : "none";
});

// On submit: check all three fields
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Name must not be empty
  if (fullname.value.trim() === "") {
    nameError.textContent = "Please enter your full name.";
    nameError.classList.add("show");
    return;
  }
  nameError.classList.remove("show");

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

  // All three are fine. Save the name and email only - never the password.
  var user = { name: fullname.value.trim(), email: email.value.trim() };
  localStorage.setItem("weddingUser", JSON.stringify(user));
  success.textContent = "Account created! Welcome to Wedding Event Planner, " + user.name + ".";
  success.classList.add("show");
});
