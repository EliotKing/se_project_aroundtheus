//===========================
// General Popup and Buttons
//===========================

import { Card, initializeCards } from "/components/card.js";

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

//=========
// Profile
//=========

// Save the profile name and description into variables
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Select the profile popup and input fields
const profilePopUp = document.querySelector(".profile-popup");
const profileForm = document.forms["profile-form"];
const nameInput = profilePopUp.querySelector(".profile-popup__name");
const descriptionInput = document.querySelector(".profile-popup__description");

// Edit Button
const editButton = document.querySelector(".profile__edit-button");
// Edit button event listener and handler
editButton.addEventListener("click", () => {
  // Assign the current profile information to the input fields
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp(profilePopUp);
});

// Submit Button
addSubmitListener(profileForm, profileSubmitHandler);
function profileSubmitHandler() {
  // Copy inputs to the profile
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

//=========
// Gallery
//=========

const cardSelector = document
  .querySelector("#card-template")
  .content.querySelector(".card");
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
  const newCard = new Card(
    {
      name: formTitle.value,
      link: formImg.value,
    },
    cardSelector,
    openImage
  );
  gallery.prepend(newCard.getCard());
  // Reset form fields and disable the button
  evt.target.reset();
  const submitButton = evt.submitter;
  submitButton.disabled = true;
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

export { openImage, cardSelector, gallery };
