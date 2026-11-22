// Services page: load the services from data/services.json
// and show them as cards. The filter buttons show one category at a time.

var allServices = [];
var currentFilter = "All";

// Build one card for one service and add it to the page.
function makeCard(service) {
  var card = document.createElement("div");
  card.className = "service-card";

  var photo = document.createElement("img");
  photo.src = service.image;
  photo.alt = service.name;
  card.appendChild(photo);

  var title = document.createElement("h3");
  title.textContent = service.name;
  card.appendChild(title);

  var category = document.createElement("p");
  category.className = "category";
  category.textContent = service.category;
  card.appendChild(category);

  var text = document.createElement("p");
  text.textContent = service.description;
  card.appendChild(text);

  var price = document.createElement("p");
  price.className = "price";
  price.textContent = service.priceText;
  card.appendChild(price);

  var button = document.createElement("a");
  button.className = "btn";
  button.href = "booking.html?service=" + service.id;
  button.textContent = "Book this service";
  card.appendChild(button);

  return card;
}

// Show the services that match the current filter.
function showServices() {
  var list = document.getElementById("serviceList");
  var message = document.getElementById("serviceMessage");
  list.innerHTML = "";
  var shown = 0;

  for (var i = 0; i < allServices.length; i++) {
    var service = allServices[i];
    if (currentFilter !== "All" && service.category !== currentFilter) {
      continue;
    }
    list.appendChild(makeCard(service));
    shown++;
  }

  if (shown === 0) {
    message.textContent = "No services in this category.";
  } else {
    message.textContent = "";
  }
}

// Filter buttons: change the filter and show the matching cards.
var buttons = document.querySelectorAll(".filter-btn");
for (var b = 0; b < buttons.length; b++) {
  buttons[b].addEventListener("click", function () {
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("active");
    }
    this.classList.add("active");
    currentFilter = this.getAttribute("data-filter");
    showServices();
  });
}

// Load the JSON file. fetch() needs the site on a local server
// (see README.md) - opening the file directly may block it.
fetch("data/services.json")
  .then(function (response) { return response.json(); })
  .then(function (data) {
    allServices = data;
    showServices();
  })
  .catch(function () {
    document.getElementById("serviceMessage").textContent =
      "Could not load the services. Please run the site with a local server (see README.md).";
  });
