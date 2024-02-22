//===========================
// General Popup and Buttons
//===========================

// General Popup Functions
function openPopUp(type) {
  type.classList.add("popup_opened");
  document.addEventListener("keydown", escPress);
}
function closePopUp(type) {
  type.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPress);
}

// Escape key event listener
function escPress(evt) {
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
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopUp(popup);
    }
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

const gallery = document.querySelector(".gallery__cards");
const cardAddPopUp = document.querySelector(".add-card-popup");

const cardAddForm = document.forms["add-card-form"];
const formTitle = cardAddForm.querySelector(".add-card-popup__place");
const formImg = cardAddForm.querySelector(".add-card-popup__image-url");

const imageWindow = document.querySelector(".image-popup");
const imageWindowImage = imageWindow.querySelector(".image-popup__image");
const imageWindowText = imageWindow.querySelector(".image-popup__text");

// Add button
const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", () => {
  openPopUp(cardAddPopUp);
});

// Submit Button
addSubmitListener(cardAddForm, cardAddSubmitHandler);
function cardAddSubmitHandler(evt) {
  // Create a card element from the user inputs and add it at the beginning of the gallery
  const newCard = {
    name: formTitle.value,
    link: formImg.value,
  };
  gallery.prepend(getCard(newCard));
  // Reset form fields
  evt.target.reset();
}

// Image Popup Window: event listener created in getCard()
function openImage(evt) {
  // Store the selected image in a variable
  const cardImage = evt.target;
  // Copy the data from the selected image to the popup window
  imageWindowImage.src = cardImage.src;
  imageWindowImage.alt = cardImage.alt;
  imageWindowText.textContent = cardImage.alt;

  openPopUp(imageWindow);
}

// Initial card objects
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

// Initial cards array
const initialCards = [
  yosemite,
  lakeLouise,
  baldMountains,
  latemar,
  vanoise,
  lagoDiBraies,
];

// Loop through each object in the initialCards array, call getCard on them, then add them to the DOM
initialCards.forEach((item) => {
  const cardToAdd = getCard(item);
  gallery.append(cardToAdd);
});

// Take an object as an argument and use its values to generate and return a card element
function getCard(place) {
  // Select the card template and clone it into a variable "card"
  const card = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);

  // Assign the Name and Link from the input object into variables
  const cardName = place.name;
  const cardLink = place.link;
  // Assign the Title and Image from the DOM into variables
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  // Set the relevant values of the DOM elements to those of the input object
  cardImage.setAttribute("src", cardLink);
  cardImage.setAttribute("alt", cardName);
  cardTitle.textContent = cardName;
  // Add event listener to the image
  cardImage.addEventListener("click", openImage);

  // Like button
  const cardLike = card.querySelector(".card__like-button");
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_pressed");
  });

  // Delete button
  const cardDelete = card.querySelector(".card__delete-button");
  cardDelete.addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  // Return the finished card element
  return card;
}

//=============================
// Unused and Removed Features
//=============================

// function makeCamelCase(string) {
//   let output = "";
//   const stringWords = string.split(" ");
//   for (let i = 0; i < stringWords.length; i++) {
//     let word = stringWords[i];
//     if (i === 0) {
//       word = word.toLowerCase();
//     } else {
//       word = word[0].toUpperCase() + word.slice(1).toLowerCase();
//     }
//     output = output + word;
//   }
//   return output;
// }

// const editProfile = {
//   title: "Edit Profile",
//   fields: ["Name", "Description"],
//   button: "Save",
// };
// const addCard = {
//   title: "New Place",
//   fields: ["Title", "Image URL"],
//   button: "Create",
// };

// function getForm(type) {
//   // Save a clone of the form template in the variable "form"
//   const form = document
//     .querySelector("#form-template")
//     .content.querySelector(".form")
//     .cloneNode(true);

//   // Store all the relevent form elements into variables
//   const title = form.querySelector(".form__title");
//   const fields = form.querySelector(".form__fields");
//   const button = form.querySelector(".form__submit");

//   form.classList.add("popup__form");

//   // Set the relevant values of the DOM elements to those of the input object
//   title.textContent = type.title;
//   // Iterate through each value in the input object's "fields" array, creating and appending a new field to the form per item,
//   // and using the value of the respective array item as the field's name and placeholder text
//   type.fields.forEach((item) => {
//     const field = form
//       .querySelector("#form-field-template")
//       .content.querySelector(".form__field")
//       .cloneNode(true);
//     field.name = item;
//     field.placeholder = item;
//     fieldClass = "form__field_type_" + item.toLowerCase().replaceAll(" ", "-");
//     field.classList.add(fieldClass);
//     // console.log(fieldClass);
//     fields.append(field);
//   });
//   button.textContent = type.button;
//   // console.log(form);

//   // Remove the form field template so there aren't duplicates
//   form.querySelector("#form-field-template").remove();

//   // Return the finished form element
//   return form;
// }

// function placeForm(type, handler) {
//   // Enable the correct styles for the popup and close button
//   popUpContainer.classList.add("popup__container_type_form");
//   popUpClose.classList.add("popup__close_type_form");
//   // Create the form and add it to the DOM: placed after the template and before the close button
//   popUpClose.before(getForm(type));
//   const form = document.querySelector(".form");
//   form.addEventListener("submit", handler);
// }
