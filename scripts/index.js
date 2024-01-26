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
initialCards.forEach((item) => {
  const cardToAdd = getCardElement(item);
  cards.append(cardToAdd);
});

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
// PopUp Functionality
//===========================

// Form Objects
const editProfile = {
  title: "Edit Profile",
  fields: ["Name", "Description"],
  button: "Save",
};
const addCard = {
  title: "New Place",
  fields: ["Title", "Image URL"],
  button: "Save",
};

function createForm(type) {
  // Saves a clone of the form template in the variable "form"
  const form = document
    .querySelector("#form-template")
    .content.querySelector(".form")
    .cloneNode(true);
  const title = form.querySelector(".form__title");
  const fields = form.querySelector(".form__fields");
  const button = form.querySelector(".form__submit");

  form.classList.add("pop-up__form");
  title.textContent = type.title;
  // Iterates through all the values in the object's "fields" array, creating and appending
  // a new field to the form per item, and using the given array item's value as the placeholder text
  type.fields.forEach((item) => {
    const field = form
      .querySelector("#form-field-template")
      .content.querySelector(".form__field")
      .cloneNode(true);
    field.placeholder = item;
    fieldClass = "form__field_type_" + item.toLowerCase().replaceAll(" ", "-");
    field.classList.add(fieldClass);
    console.log(fieldClass);
    fields.append(field);
  });
  button.textContent = type.button;
  console.log(form);
  return form;
}

// Global variables
const popUp = document.querySelector(".pop-up");
const popUpClose = popUp.querySelector(".pop-up__close");

const editButton = document.querySelector(".profile__edit-button");

const addButton = document.querySelector(".profile__add-button");

const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(
  ".profile__description"
);

// Event listeners
editButton.addEventListener("click", openProfilePopUp);
addButton.addEventListener("click", openGalleryPopUp);
popUpClose.addEventListener("click", closePopUp);

// Functions
function openPopUp() {
  popUp.classList.add("pop-up_opened");
}
function closePopUp() {
  document.querySelector(".pop-up__form").remove();
  popUp.classList.remove("pop-up_opened");
}
function openProfilePopUp() {
  // Add relevent form to the DOM
  popUpClose.before(createForm(editProfile));
  form = document.querySelector(".form");

  const newProfileName = document.querySelector(".form__field_type_name");
  const newProfileDescription = document.querySelector(
    ".form__field_type_description"
  );

  // Assigns the current profile information to the input fields
  newProfileName.value = currentProfileName.textContent;
  newProfileDescription.value = currentProfileDescription.textContent;

  form.addEventListener("submit", handleProfileFormSubmit);
  // displays the pop-up window
  openPopUp();
}
function openGalleryPopUp() {
  // Add relevent form to the DOM
  popUpClose.before(createForm(addCard));
  // Open the pop-up
  openPopUp();
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
  closePopUp();
}
