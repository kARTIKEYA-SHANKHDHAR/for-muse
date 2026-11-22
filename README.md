# Wedding Event Planner

A simple website for planning Indian weddings — browse services, build a
custom package, book a wedding, view the portfolio, and contact the team.

## Features

- **Home page** — hero, about section, photo strip and service highlights.
- **About page** — our story, values and the team.
- **Services page** — service cards loaded from a JSON file, with a
  category filter (All / Planning / Décor & Photo).
- **Custom Service Builder** — pick a planning level, style, services and
  experience; your package is saved and shown on the booking page.
- **Booking page** — booking form with validation. Bookings are saved and
  listed on the same page, and the service can be pre-selected from the
  Services page.
- **Portfolio page** — wedding gallery with filters and pop-up details.
- **Contact page** — contact form with validation; messages are saved and
  listed on the page.
- **Login / Signup pages** — simple forms with validation. This is a demo
  login only, not real authentication.

## Technologies Used

- HTML
- CSS
- Vanilla JavaScript (no frameworks)
- JSON for data
- localStorage for saving user-submitted data

There is no backend, no database and no build step.

## Project Folder Structure

```
Wedding-Event-Planner/
├── index.html                    (redirects to home.html)
├── home.html / home.css          (home page)
├── about.html / about.css        (about page)
├── services.html / services.css / services.js
├── custom-service-builder.html / custom-service-builder.css
├── booking.html / booking.css / booking.js
├── portfolio.html / portfolio.css
├── contact.html / contact.css / contact.js
├── login.html / login.css / login.js
├── signup.html / signup.css / signup.js
├── data/
│   └── services.json             (all wedding services)
├── assets/
│   └── README.md                 (image files are missing - see below)
├── download-assets.sh            (original Figma download script)
└── README.md
```

## How to Run the Project Locally

The Services and Booking pages use `fetch()` to load `data/services.json`.
`fetch()` does not work when you open an HTML file directly from your
computer, so run a small local server instead:

```bash
cd Wedding-Event-Planner
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (It redirects to the
home page.) Stop the server with `Ctrl + C`.

You can also just double-click `index.html` to open the home, about,
portfolio, contact, login and signup pages — only the JSON loading on the
Services and Booking pages needs the server.

## How JSON Is Used

`data/services.json` holds the list of wedding services. Each service has
an `id`, `name`, `category`, `price`, `priceText` (for example
"Starting at ₹1,49,999"), `description` and `image`.

- `services.js` reads the file with `fetch("data/services.json")` and
  builds the service cards on the Services page.
- `booking.js` reads the same file to fill the service dropdown on the
  Booking page.
- The prices are starting prices only.

## How localStorage Is Used

localStorage saves data in the browser, so it stays there after you
refresh the page. There is no server and no database. The keys used are:

| Key | What is saved | Where |
| --- | --- | --- |
| `weddingsBookings` | Booking form submissions (JSON array) | booking.html |
| `contactMessages` | Contact form messages (JSON array) | contact.html |
| `weddingPackage` | Package saved in the service builder (JSON object) | custom-service-builder.html, shown on booking.html |
| `weddingUser` | Name and email of the logged-in user — **never the password** | login.html, signup.html, auth.js |
| `weddingUsers` | List of all signed-up accounts (name + email) that login checks | signup.html, login.js |

After a successful login the user is taken to home.html, and the navbar
shows "Hi, &lt;name&gt;" with a Logout option instead of Login. Logout clears
`weddingUser` only, so the account stays saved and can log in again.

To clear the saved data, open the browser developer tools, go to
Application → Local Storage, and delete the keys — or clear the site data.

## Limitations

- **No real backend:** bookings, contact messages and accounts are saved
  only in the visitor's own browser (localStorage). They are not sent to
  the team and are not shared between devices or browsers.
- **No real authentication:** login/signup only check the fields against the
  accounts saved in this browser and save the name/email. Passwords are
  never stored. Anyone can see the saved data in their own browser, so do
  not use real passwords here. An email with no account cannot log in.
- **Images:** the photos, icons and fonts in `assets/` are included in
  this repo (added 22 Nov 2026). The portfolio photos come from Unsplash
  and still load when online. The login/signup pages also expect a
  `wedding.jpg` photo in the project root folder.
- **Prices are starting prices:** the final price depends on venue, guest
  count and ceremonies.
- **Payments are not included:** there is no payment page in this project.
