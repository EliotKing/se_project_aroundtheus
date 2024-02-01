//===========================
// General Popup and Buttons
//===========================

// General Popup Functions
function openPopUp(type) {
  type.classList.add("popup_opened");
}
function closePopUp(type) {
  type.classList.remove("popup_opened");
  resetPopUp(type);
}
function resetPopUp(type) {
  if (type === cardAddPopUp) {
    const title = cardAddPopUp.querySelector(".add-card-popup__place");
    const url = cardAddPopUp.querySelector(".add-card-popup__image-url");
    title.value = "";
    url.value = "";
  }
}

// Add event listeners to buttons
function addCloseListener(type) {
  const closeButton = type.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopUp(type);
  });
}
function addSubmitListener(type) {
  const submitButton = type.querySelector(".form__submit");

  submitButton.addEventListener("click", (evt) => {
    evt.preventDefault();

    if (type === profilePopUp) {
      // Copy inputs to the profile
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
    } else if (type === cardAddPopUp) {
      // Select the form fields and assign them to the input variables
      const titleInput = cardAddPopUp.querySelector(
        ".add-card-popup__place"
      ).value;
      const imgInput = cardAddPopUp.querySelector(
        ".add-card-popup__image-url"
      ).value;

      // Create a card element from the user inputs and add it at the beginning of the gallery
      const newCard = {
        name: titleInput,
        link: imgInput,
      };
      gallery.prepend(getCard(newCard));
    }

    closePopUp(type);
  });
}

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

  openPopUp(profilePopUp);
});

// Close and Save Buttons
addCloseListener(profilePopUp);
addSubmitListener(profilePopUp);

//=========
// Gallery
//=========

const gallery = document.querySelector(".gallery__cards");
const cardAddPopUp = document.querySelector(".add-card-popup");
const imagePopUp = document.querySelector(".image-popup");

// Add button
const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", () => {
  openPopUp(cardAddPopUp);
});

// Close and Save Buttons
addCloseListener(cardAddPopUp);
addSubmitListener(cardAddPopUp);
addCloseListener(imagePopUp);

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
    evt.target.parentElement.remove();
  });

  // Return the finished card element
  return card;
}

// Image Popup Window: event listener created in getCard()
function openImage(evt) {
  // Store the selected image in a variable
  const cardImage = evt.target;

  // Clone the image window template and select its relevant children
  const openedImage = imagePopUp.querySelector(".image-popup__image");
  const text = imagePopUp.querySelector(".image-popup__text");

  // Copy the data from the opened image to the popup window
  openedImage.src = cardImage.src;
  openedImage.alt = cardImage.alt;
  text.textContent = cardImage.alt;

  openPopUp(imagePopUp);
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
