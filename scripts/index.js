//=========================
// General Form and Pop-up
//=========================

// Select the pop-up window and close button from the DOM, save them into variables, and add an event listener to the button
const popUp = document.querySelector(".pop-up");
const popUpContainer = popUp.querySelector(".pop-up__container");
const popUpClose = popUp.querySelector(".pop-up__close");
popUpClose.addEventListener("click", closePopUp);

// General Pop-up Functions
function openPopUp() {
  popUp.classList.add("pop-up_mode_open");
}
function closePopUp() {
  popUp.classList.add("pop-up_mode_closing");
  // Event listener to detect when the pop-up is done fading away, then call resetPopUp to finish the process
  popUp.addEventListener("mouseleave", (evt) => {
    resetPopUp();
  });
}

// Reset the pop-up element to its original state and delete form/image elements
function resetPopUp() {
  // Check if there is an element with classes before the close button (i.e. a pop-up has successfully been opened). If there is, remove the element
  // This ensures that the template elements aren't ever deleted accidentally
  const contentToClose = popUpClose.previousSibling;
  if (contentToClose.classList != undefined) {
    contentToClose.remove();
  }
  // Reset the pop-up container and close button to their default classes
  popUpContainer.classList.remove(
    "pop-up__container_type_form",
    "pop-up__container_type_image"
  );
  popUpClose.classList.remove(
    "pop-up__close_type_form",
    "pop-up__close_type_image"
  );
  // Disable the pop-up window
  popUp.classList.remove("pop-up_mode_open", "pop-up_mode_closing");
}

// Form Objects
const editProfile = {
  title: "Edit Profile",
  fields: ["Name", "Description"],
  button: "Save",
};
const addCard = {
  title: "New Place",
  fields: ["Title", "Image URL"],
  button: "Create",
};

// Take a form object as an argument, generate a form using the object's values, and return the form
function getForm(type) {
  // Save a clone of the form template in the variable "form"
  const form = document
    .querySelector("#form-template")
    .content.querySelector(".form")
    .cloneNode(true);

  // Store all the relevent form elements into variables
  const title = form.querySelector(".form__title");
  const fields = form.querySelector(".form__fields");
  const button = form.querySelector(".form__submit");

  form.classList.add("pop-up__form");

  // Set the relevant values of the DOM elements to those of the input object
  title.textContent = type.title;
  // Iterate through each value in the input object's "fields" array, creating and appending a new field to the form per item,
  // and using the value of the respective array item as the field's name and placeholder text
  type.fields.forEach((item) => {
    const field = form
      .querySelector("#form-field-template")
      .content.querySelector(".form__field")
      .cloneNode(true);
    field.name = item;
    field.placeholder = item;
    fieldClass = "form__field_type_" + item.toLowerCase().replaceAll(" ", "-");
    field.classList.add(fieldClass);
    // console.log(fieldClass);
    fields.append(field);
  });
  button.textContent = type.button;
  // console.log(form);

  // Remove the form field template so there aren't duplicates
  form.querySelector("#form-field-template").remove();

  // Return the finished form element
  return form;
}

// Take a form object and handler function name as arguments, and add the respective form to the DOM
function placeForm(type, handler) {
  // Enable the correct styles for the pop-up and close button
  popUpContainer.classList.add("pop-up__container_type_form");
  popUpClose.classList.add("pop-up__close_type_form");
  // Create the form and add it to the DOM: placed after the template and before the close button
  popUpClose.before(getForm(type));
  const form = document.querySelector(".form");
  form.addEventListener("submit", handler);
}

//=========
// Profile
//=========

// Save the profile name and description into variables
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Initialize the form input variables: dynamic since the form does not exist at initialization
let nameInput;
let descriptionInput;

// Edit Button
const editButton = document.querySelector(".profile__edit-button");
// Edit button event listener and handler
editButton.addEventListener("click", () => {
  placeForm(editProfile, handleEditProfile);

  // Select the form fields and assign them to the input variables
  nameInput = document.querySelector(".form__field_type_name");
  descriptionInput = document.querySelector(".form__field_type_description");

  // Assign the current profile information to the input fields
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopUp();
});

// Save Button
function handleEditProfile(evt) {
  evt.preventDefault();

  // Copy inputs to the profile
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopUp();
}

//=========
// Gallery
//=========

const gallery = document.querySelector(".gallery__cards");

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

// Loop through each object in the initialCards array, call getCard on them, then add them to the DOM
initialCards.forEach((item) => {
  const cardToAdd = getCard(item);
  gallery.append(cardToAdd);
});

// Add button
const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  placeForm(addCard, handleAddCard);
  openPopUp();
});

// Handle adding cards through the add button
function handleAddCard(evt) {
  evt.preventDefault();

  // Select the form fields and assign them to the input variables
  const titleInput = document.querySelector(".form__field_type_title").value;
  const imgInput = document.querySelector(".form__field_type_image-url").value;

  // Create a card object from the user inputs and add it at the beginning of the gallery
  const newCard = {
    name: titleInput,
    link: imgInput,
  };
  gallery.prepend(getCard(newCard));

  closePopUp();
}

// Image Pop-up Window
function openImage(evt) {
  // Enable the correct styles for the pop-up and close button
  popUpContainer.classList.add("pop-up__container_type_image");
  popUpClose.classList.add("pop-up__close_type_image");

  // Store the selected image in a variable
  const cardImage = evt.target;

  // Clone the image window template and select its relevant children
  const imageWindow = document
    .querySelector("#image-window-template")
    .content.querySelector(".image-window")
    .cloneNode(true);
  const openedImage = imageWindow.querySelector(".image-window__image");
  const text = imageWindow.querySelector(".image-window__text");

  // Copy the data from the opened image to the pop-up window
  openedImage.src = cardImage.src;
  openedImage.alt = cardImage.alt;
  text.textContent = cardImage.alt;

  // Add the image window to the DOM: placed after the template and before the close button
  popUpClose.before(imageWindow);

  openPopUp();
}

//=================
// Unused Features
//=================

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
