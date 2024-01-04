//===================
// Card Functionality
//===================

// Card objects
const yosemite = {
  name: "Yosemite Valley",
  link: "./images/yosemite.jpg",
};
const lakeLouise = {
  name: "Lake Louise",
  link: "./images/lake-louise.jpg",
};
const baldMountains = {
  name: "Bald Mountains",
  link: "./images/bald-mountains.jpg",
};
const latemar = {
  name: "Latemar",
  link: "./images/latemar.jpg",
};
const vanoise = {
  name: "Vanoise National Park",
  link: "./images/vanoise.jpg",
};
const lagoDiBraies = {
  name: "Lago di Braies",
  link: "./images/lago-di-braies.jpg",
};

// Cards array
const initialCards = [
  yosemite,
  lakeLouise,
  baldMountains,
  latemar,
  vanoise,
  lagoDiBraies,
];

const cards = document.querySelector(".gallery__cards");

// Loops through each object in the cards array, calls getCardElement on them, and adds them to the DOM
for (let i = 0; i < initialCards.length; i++) {
  const cardToAdd = getCardElement(initialCards[i]);
  cards.append(cardToAdd);
}

function getCardElement(data) {
  // Assigns the properties from the card objects to variables
  const cardName = data.name;
  const cardLink = data.link;
  // Selects the card template and clones it into a variable "card"
  const card = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
  // Selects the relevant card sub-elements and assigns them into variables
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  // Sets the card values and returns the card
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", cardName);
  cardTitle.textContent = cardName;
  return card;
}

//===========================
// Edit Profile Functionality
//===========================

// Global variables
const profilePopUp = document.querySelector(".pop-up");
const profilePopUpForm = document.querySelector(".pop-up__form");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".button_type_close");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(
  ".profile__description"
);
const newProfileName = document.querySelector(".form__field_type_name");
const newProfileDescription = document.querySelector(
  ".form__field_type_description"
);

// Event listeners
editButton.addEventListener("click", openProfilePopUp);
closeButton.addEventListener("click", closeProfilePopUp);
profilePopUpForm.addEventListener("submit", handleProfileFormSubmit);

// Functions
function openProfilePopUp() {
  // Assigns the current profile information to the input fields
  newProfileName.value = currentProfileName.textContent;
  newProfileDescription.value = currentProfileDescription.textContent;
  // displays the pop-up window
  profilePopUp.classList.add("pop-up_opened");
}

function closeProfilePopUp() {
  profilePopUp.classList.remove("pop-up_opened");
}

// Copies the information from the pop-up form fields to the profile
function handleProfileFormSubmit(event) {
  event.preventDefault();
  // Selects the text inputs in the form fields
  const nameInput = document.querySelector(".form__field_type_name").value;
  const descriptionInput = document.querySelector(
    ".form__field_type_description"
  ).value;
  // Copies over the submitted text and closes the pop-up window
  currentProfileName.textContent = nameInput;
  currentProfileDescription.textContent = descriptionInput;
  closeProfilePopUp();
}
