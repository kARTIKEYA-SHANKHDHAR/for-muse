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

  // Keep a list of all accounts in localStorage ("weddingUsers") so that
  // login.js can check whether an email has an account.
  var users = [];
  try {
    users = JSON.parse(localStorage.getItem("weddingUsers")) || [];
  } catch (err) {
    users = [];
  }
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === user.email) {
      emailError.textContent = "An account with this email already exists. Please login instead.";
      emailError.classList.add("show");
      return;
    }
  }
  users.push(user);
  localStorage.setItem("weddingUsers", JSON.stringify(users));

  // Log the new user in straight away.
  localStorage.setItem("weddingUser", JSON.stringify(user));
  success.textContent = "Account created! Welcome to Ever After, " + user.name + ".";
  success.classList.add("show");
});
