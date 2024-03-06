import { openImage, cardSelector, gallery } from "/pages/index.js";

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners(card, image) {
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

    // Image
    image.addEventListener("click", this._handleImageClick);
  }

  getCard() {
    // Select the card template and clone it into a variable "card"
    const card = this._cardSelector.cloneNode(true);

    // Assign the Title and Image from the DOM into variables
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    // Assign the relevent class reference properties into the DOM elements
    cardTitle.textContent = this._name;
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);

    this._setEventListeners(card, cardImage);

    // Return the finished card element
    return card;
  }
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

function initializeCards() {
  // Loop through each object in the initialCards array, call getCard on them, then add them to the DOM
  initialCards.forEach((item) => {
    const cardToAdd = new Card(
      {
        name: item.name,
        link: item.link,
      },
      cardSelector,
      openImage
    );
    gallery.append(cardToAdd.getCard());
  });
}

export { Card, initializeCards };
