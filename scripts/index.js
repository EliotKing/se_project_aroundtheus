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

// Button variables
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".button_type_close");
let profileModal = document.querySelector(".modal-window");

// Modal window functions
function openProfileModal() {
  profileModal.classList.add("modal-window_opened");
}
function closeProfileModal() {
  profileModal.classList.remove("modal-window_opened");
}

// Button event listeners
editButton.addEventListener("click", openProfileModal);
closeButton.addEventListener("click", closeProfileModal);
