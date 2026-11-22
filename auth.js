// Shared navbar login state.
// The logged-in user is saved in localStorage as "weddingUser"
// (name and email only, never the password).

// Read the saved user, or null if nobody is logged in.
function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("weddingUser"));
  } catch (e) {
    return null;
  }
}

// Show "Hi, <name>" + Logout when logged in, and Login when logged out.
function updateNavbar() {
  var user = getSavedUser();
  var loginLink = document.getElementById("loginLink");
  var userArea = document.getElementById("userArea");
  var userName = document.getElementById("userName");
  var logoutLink = document.getElementById("logoutLink");

  // This page has no navbar (login / signup pages), so there is nothing to do.
  if (!loginLink || !userArea) {
    return;
  }

  if (user) {
    loginLink.style.display = "none";
    userArea.style.display = "";
    userName.textContent = "Hi, " + (user.name || user.email);
  } else {
    loginLink.style.display = "";
    userArea.style.display = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      // Logout clears the session only. The saved accounts stay,
      // so the user can log in again with the same email.
      localStorage.removeItem("weddingUser");
      window.location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);
