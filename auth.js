// Shared navbar login state.
// The logged-in user is saved in localStorage as "weddingUser"
// (name and email only, never the password).
// The navbar never shows the user's name - logged in it shows
// only Logout, logged out it shows only Login.

// Is anyone logged in right now?
function isLoggedIn() {
  return loadData("weddingUser", null) !== null;
}

// Show Logout when logged in, and Login when logged out.
function updateNavbar() {
  var loginLink = document.getElementById("loginLink");
  var userArea = document.getElementById("userArea");
  var logoutLink = document.getElementById("logoutLink");

  // This page has no navbar (login / signup pages), so there is nothing to do.
  if (!loginLink || !userArea) {
    return;
  }

  if (isLoggedIn()) {
    loginLink.style.display = "none";
    userArea.style.display = "";
  } else {
    loginLink.style.display = "";
    userArea.style.display = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
      event.preventDefault();
      // Logout clears the session only. The saved accounts stay,
      // so the user can log in again with the same email.
      clearData("weddingUser");
      window.location.reload();
    });
  }
}

document.addEventListener("DOMContentLoaded", updateNavbar);
