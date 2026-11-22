// Login page logic - check email and password, then show a message

var form = document.getElementById("loginForm");
var email = document.getElementById("email");
var password = document.getElementById("password");
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passwordError");
var success = document.getElementById("formSuccess");
var info = document.getElementById("formInfo");
var formError = document.getElementById("formError");

// Show a message in one of the banner boxes on the page.
function showBanner(box, message) {
  box.textContent = message;
  box.classList.add("show");
}

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

// Find a registered account by email. Accounts are saved by signup.js
// in localStorage as "weddingUsers" (a JSON list of name + email).
// Passwords are never stored, so the password is only checked for length.
function findUser(email) {
  var users = loadData("weddingUsers", []);
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  // Accounts created before the list existed were saved as "weddingUser".
  var oldUser = loadData("weddingUser", null);
  if (oldUser && oldUser.email === email) {
    return oldUser;
  }
  return null;
}

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

  // Both fields are valid, so now check the account exists.
  var user = findUser(email.value.trim());
  if (!user) {
    // Wrong email (or no account yet): show an error and stay on this page.
    showBanner(formError, "Incorrect email or password. If you don't have an account yet, please sign up first.");
    return;
  }

  // Correct account. Save the login session (name and email only,
  // never the password) and go to the homepage.
  // This is a demo login only - there is no real authentication.
  saveData("weddingUser", user);
  success.textContent = "Login successful! Taking you to the homepage...";
  success.classList.add("show");
  setTimeout(function () {
    window.location.href = "home.html";
  }, 900);
});
