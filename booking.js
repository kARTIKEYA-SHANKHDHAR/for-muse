// Booking page: fill the service list from data/services.json,
// check the form, save the booking in localStorage,
// and list all saved bookings.

// Read saved bookings from localStorage (or start with an empty list).
function loadBookings() {
  var saved = localStorage.getItem("weddingsBookings");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

// Fill the service dropdown from the JSON file.
// If the page was opened with ?service=full-planning, select that service.
function loadServices() {
  fetch("data/services.json")
    .then(function (response) { return response.json(); })
    .then(function (services) {
      var select = document.getElementById("service");
      select.innerHTML = "";
      var first = document.createElement("option");
      first.value = "";
      first.textContent = "Choose a service";
      select.appendChild(first);
      for (var i = 0; i < services.length; i++) {
        var option = document.createElement("option");
        option.value = services[i].id;
        option.textContent = services[i].name + " - " + services[i].priceText;
        select.appendChild(option);
      }
      // Pre-select the service from the page link, if there is one.
      var params = new URLSearchParams(window.location.search);
      var wanted = params.get("service");
      if (wanted) {
        select.value = wanted;
      }
    })
    .catch(function () {
      document.getElementById("service").innerHTML = "<option value=''>Could not load services</option>";
    });
}

// Show the package saved in the service builder, if there is one.
function showPackage() {
  var saved = localStorage.getItem("weddingPackage");
  if (!saved) {
    return;
  }
  var pkg = JSON.parse(saved);
  var text = "Planning: " + (pkg.planning || "not selected")
    + " | Style: " + (pkg.style || "not selected")
    + " | Services: " + (pkg.services.join(", ") || "none")
    + " | Experience: " + (pkg.experience || "not selected");
  document.getElementById("packageText").textContent = text;
  document.getElementById("packageBox").style.display = "block";
}

// Show all bookings saved in this browser.
function showBookings() {
  var bookings = loadBookings();
  var count = document.getElementById("bookingCount");
  var list = document.getElementById("bookingList");
  list.innerHTML = "";
  if (bookings.length === 0) {
    count.textContent = "No bookings saved yet.";
    return;
  }
  count.textContent = "You have " + bookings.length + " booking(s) saved on this browser.";
  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    var item = document.createElement("li");
    item.textContent = b.name + " - " + b.serviceName + " on " + b.date + " (" + b.guests + " guests)";
    list.appendChild(item);
  }
}

// Check the form. Returns true when everything is fine.
function validateBooking() {
  var error = document.getElementById("formError");
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var date = document.getElementById("date").value;
  var service = document.getElementById("service").value;
  var guests = document.getElementById("guests").value;
  var message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || phone === "" || date === "" || service === "" || guests === "" || message === "") {
    error.textContent = "Please fill in all the fields.";
    return false;
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    error.textContent = "Please enter a valid email address.";
    return false;
  }
  if (phone.length < 10) {
    error.textContent = "Please enter a valid phone number (at least 10 digits).";
    return false;
  }
  // The date must not be in the past.
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var chosen = new Date(date);
  if (chosen < today) {
    error.textContent = "Please choose a future date for your wedding.";
    return false;
  }
  if (Number(guests) < 1) {
    error.textContent = "Please enter at least 1 guest.";
    return false;
  }
  error.textContent = "";
  return true;
}

// When the form is submitted: validate, save, show success.
document.getElementById("bookingForm").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateBooking()) {
    return;
  }

  var select = document.getElementById("service");
  var booking = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    date: document.getElementById("date").value,
    service: select.value,
    serviceName: select.options[select.selectedIndex].textContent,
    guests: document.getElementById("guests").value,
    message: document.getElementById("message").value.trim()
  };

  // Add the saved package from the service builder, if there is one.
  var savedPackage = localStorage.getItem("weddingPackage");
  if (savedPackage) {
    booking.package = JSON.parse(savedPackage);
  }

  var bookings = loadBookings();
  bookings.push(booking);
  localStorage.setItem("weddingsBookings", JSON.stringify(bookings));

  document.getElementById("formSuccess").textContent =
    "Thank you, " + booking.name + "! Your booking has been saved.";
  document.getElementById("detailsText").textContent =
    booking.name + " - " + booking.serviceName + " on " + booking.date +
    " (" + booking.guests + " guests). We will contact you at " + booking.email + ".";
  document.getElementById("bookingDetails").style.display = "block";
  document.getElementById("bookingForm").reset();
  showBookings();
});

// Load everything when the page opens.
loadServices();
showPackage();
showBookings();
