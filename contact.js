// Contact form: check the fields, save the message in localStorage,
// and show the saved messages on the page.

// Read saved messages from localStorage (or start with an empty list).
// loadData returns [] when nothing is saved yet or the saved text is broken.
function loadMessages() {
  return loadData("contactMessages", []);
}

// Show the saved messages under the form.
function showMessages() {
  var messages = loadMessages();
  var count = document.getElementById("savedCount");
  var list = document.getElementById("savedList");
  list.innerHTML = "";
  if (messages.length === 0) {
    count.textContent = "No messages saved yet.";
    return;
  }
  count.textContent = "You have saved " + messages.length + " message(s) on this browser.";
  for (var i = 0; i < messages.length; i++) {
    var item = document.createElement("li");
    item.textContent = messages[i].name + " (" + messages[i].email + "): " + messages[i].message;
    list.appendChild(item);
  }
}

// Show a message under the form (red for error, green for success).
function showFormMessage(text, isError) {
  var box = document.getElementById("formMessage");
  box.textContent = text;
  box.className = isError ? "error" : "success";
}

// Check the form. Returns true when everything is fine.
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || phone === "" || message === "") {
    showFormMessage("Please fill in all the fields.", true);
    return false;
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    showFormMessage("Please enter a valid email address.", true);
    return false;
  }
  if (phone.length < 10) {
    showFormMessage("Please enter a valid phone number (at least 10 digits).", true);
    return false;
  }
  return true;
}

// When the form is submitted: validate, save, show success.
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!validateForm()) {
    return;
  }

  var newMessage = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim(),
    date: new Date().toLocaleString()
  };

  var messages = loadMessages();
  messages.push(newMessage);
  saveData("contactMessages", messages);

  document.getElementById("contactForm").reset();
  showFormMessage("Thank you, " + newMessage.name + "! Your message has been saved.", false);
  showMessages();
});

// Show any messages saved earlier, as soon as the page loads.
showMessages();
