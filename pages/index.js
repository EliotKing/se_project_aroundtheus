import { initializeCards, createCard } from "/components/Card.js";
import { FormValidator } from "/components/FormValidator.js";

//===========================
// General Popup and Buttons
//===========================

// General Popup Functions
function openPopUp(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}
function closePopUp(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Escape key event listener
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const currentPopUp = document.querySelector(".popup_opened");
    closePopUp(currentPopUp);
  }
}

// Add event listeners to buttons
function addSubmitListener(form, handler) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handler(evt);
    closePopUp(form.closest(".popup"));
  });
}
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  // Add event listeners to close buttons
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopUp(popup));
  // Add event listeners to popup windows to close when clicking out of the form
  let contentNotClicked = true;
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup && contentNotClicked === true) {
      closePopUp(popup);
    }
    contentNotClicked = true;
  });
  // Mousedown and mouseup events to make sure that no part of the click happens on the popup container.
  // Without this, clicking down on the form but releasing off of it,
  // or starting a click off the form but releasing on it, would still close the window.
  const popUpContainer = popup.querySelector(".popup__container");
  popUpContainer.addEventListener("mousedown", () => {
    contentNotClicked = false;
  });
  popUpContainer.addEventListener("mouseup", () => {
    contentNotClicked = false;
  });
});

//============
// Validation
//============

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Object to store all form validators
const formValidators = {};

// Iterate through all forms, create and enable validators, and store them in the formValidators object
function enableValidation(config) {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute("name");
    // Store validator in the formValidators object and enable validation
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(validationConfig);

//=========
// Profile
//=========

// Save the profile name and description into variables
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Select the profile popup and input fields
const profilePopUp = document.querySelector(".profile-popup");
const nameInput = profilePopUp.querySelector(".profile-popup__name");
const descriptionInput = document.querySelector(".profile-popup__description");

// Edit Button
const editButton = document.querySelector(".profile__edit-button");
// Edit button event listener and handler
editButton.addEventListener("click", () => {
  // Assign the current profile information to the input fields
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  formValidators["profile-form"].resetValidation();

  openPopUp(profilePopUp);
});

// Submit Button
const profileForm = document.forms["profile-form"];

addSubmitListener(profileForm, profileSubmitHandler);
function profileSubmitHandler() {
  // Copy inputs to the profile
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

//=========
// Gallery
//=========

const cardSelector = "#card-template";
const gallery = document.querySelector(".gallery__cards");

initializeCards();

// Add button
const cardAddPopUp = document.querySelector(".add-card-popup");
const cardAddButton = document.querySelector(".profile__add-button");

cardAddButton.addEventListener("click", () => {
  openPopUp(cardAddPopUp);
});

// Submit Button
const cardAddForm = document.forms["add-card-form"];
const formTitle = cardAddForm.querySelector(".add-card-popup__place");
const formImg = cardAddForm.querySelector(".add-card-popup__image-url");

addSubmitListener(cardAddForm, cardAddSubmitHandler);
function cardAddSubmitHandler(evt) {
  // Create a card element from the user inputs and add it at the beginning of the gallery
  const newCard = createCard({
    name: formTitle.value,
    link: formImg.value,
  });
  gallery.prepend(newCard);
  // Reset validation and form fields
  evt.target.reset();
  formValidators["add-card-form"].disableSubmit();
}

// Image Popup Window: event listener created in getCard()
const imageWindow = document.querySelector(".image-popup");
const imageWindowImage = imageWindow.querySelector(".image-popup__image");
const imageWindowText = imageWindow.querySelector(".image-popup__text");

function openImage(evt) {
  // Store the selected image in a variable
  const cardImage = evt.target;
  // Copy the data from the selected image to the popup window
  imageWindowImage.src = cardImage.src;
  imageWindowImage.alt = cardImage.alt;
  imageWindowText.textContent = cardImage.alt;

  openPopUp(imageWindow);
}

//=========
// Exports
//=========

export { openImage, cardSelector, gallery };
