//===================
// Card Functionality
//===================

// Card objects
let yosemite = {
  name: "Yosemite Valley",
  link: "./images/yosemite.jpg",
};
let lakeLouise = {
  name: "Lake Louise",
  link: "./images/lake-louise.jpg",
};
let baldMountains = {
  name: "Bald Mountains",
  link: "./images/bald-mountains.jpg",
};
let latemar = {
  name: "Latemar",
  link: "./images/latemar.jpg",
};
let vanoise = {
  name: "Vanoise National Park",
  link: "./images/vanoise.jpg",
};
let lagoDiBraies = {
  name: "Lago di Braies",
  link: "./images/lago-di-braies.jpg",
};

// Cards array
let initialCards = [
  yosemite,
  lakeLouise,
  baldMountains,
  latemar,
  vanoise,
  lagoDiBraies,
];

// Loops through each object in the cards array, calls getCardElement on them, and adds them to the DOM
for (let i = 0; i < initialCards.length; i++) {
  let cards = document.querySelector(".gallery__cards");
  let cardToAdd = getCardElement(initialCards[i], i);
  cards.append(cardToAdd);
}

function getCardElement(data) {
  // Assigns the properties from the card objects to variables
  let cardName = data.name;
  let cardLink = data.link;
  // Selects the card template and clones it into a variable "card"
  let card = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  // Selects the relevant card sub-elements and assigns them into variables
  let cardImage = card.querySelector(".card__image");
  let cardTitle = card.querySelector(".card__title");

  // Sets the card values and returns the card
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", cardName);
  cardTitle.textContent = cardName;
  return card;
}

//===========================
// Edit Profile Functionality
//===========================

// Constant variables
const profileModal = document.querySelector(".modal-window");
const profileModalForm = document.querySelector(".modal-window__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".button_type_close");

// Dynamic variables
let currentProfileName;
let currentProfileDescription;

// Event listeners
editButton.addEventListener("click", toggleProfileModal);
closeButton.addEventListener("click", toggleProfileModal);
profileModalForm.addEventListener("submit", handleProfileFormSubmit);

// Opens and closes the profile modal window
function toggleProfileModal() {
  // Selects relevant elements
  currentProfileName = document.querySelector(".profile__name");
  currentProfileDescription = document.querySelector(".profile__description");
  let newProfileName = document.querySelector(".form__field_type_name");
  let newProfileDescription = document.querySelector(
    ".form__field_type_description"
  );
  // Assigns the current profile information to the input fields
  newProfileName.value = currentProfileName.textContent;
  newProfileDescription.value = currentProfileDescription.textContent;
  // toggles the modal window
  profileModal.classList.toggle("modal-window_opened");
}

// Copies the information from the modal form fields to the profile
function handleProfileFormSubmit(event) {
  event.preventDefault();
  // Selects the text inputs in the form fields
  let nameInput = document.querySelector(".form__field_type_name").value;
  let descriptionInput = document.querySelector(
    ".form__field_type_description"
  ).value;
  // Copies over the submitted text and closes the modal window
  currentProfileName.textContent = nameInput;
  currentProfileDescription.textContent = descriptionInput;
  profileModal.classList.remove("modal-window_opened");
}
