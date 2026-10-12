"use strict";

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const checkin = document.getElementById("checkin");

function getLocalDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

checkin.min = getLocalDate();
checkin.value = getLocalDate();

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  const formData = new FormData(bookingForm);

  const details = {
    type: formData.get("tripType"),
    destination: formData.get("location"),
    date: formData.get("checkin"),
    rooms: formData.get("rooms"),
    adults: formData.get("adults"),
    children: formData.get("children")
  };

  bookingMessage.textContent =
    `Searching ${details.type.toLowerCase()} in ${details.destination} ` +
    `for ${details.date}. Rooms: ${details.rooms}, ` +
    `adults: ${details.adults}, children: ${details.children}.`;

  console.log("Booking search:", details);
});

const headerSearch = document.getElementById("headerSearch");

headerSearch.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = headerSearch.querySelector("input");
  const query = input.value.trim();

  if (!query) {
    input.focus();
    return;
  }

  const locationSelect = document.getElementById("location");
  const matchingOption = [...locationSelect.options].find((option) =>
    option.text.toLowerCase().includes(query.toLowerCase())
  );

  if (matchingOption && matchingOption.value) {
    locationSelect.value = matchingOption.value;
  } else {
    bookingMessage.textContent =
      `Search requested for "${query}". Please select a destination.`;
  }

  document.getElementById("booking").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


const hotelGrid = document.getElementById("hotelGrid");

document.getElementById("nextHotels").addEventListener("click", () => {
  if (hotelGrid.children.length > 1) {
    hotelGrid.appendChild(hotelGrid.firstElementChild);
  }
});

document.getElementById("prevHotels").addEventListener("click", () => {
  if (hotelGrid.children.length > 1) {
    hotelGrid.prepend(hotelGrid.lastElementChild);
  }
});

document.getElementById("signupBtn").addEventListener("click", () => {
  alert("Connect your sign-up page or registration API here.");
});

document.getElementById("accountBtn").addEventListener("click", () => {
  alert("Connect your login page or authentication API here.");
});

const subscribeForm = document.getElementById("subscribeForm");
const subscribeMessage = document.getElementById("subscribeMessage");

subscribeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!subscribeForm.reportValidity()) {
    return;
  }

  const email = subscribeForm.querySelector("input").value.trim();

  subscribeMessage.textContent =
    `Thank you! Your email (${email}) is ready for subscription.`;

  console.log("Newsletter subscription:", email);

  subscribeForm.reset();
});