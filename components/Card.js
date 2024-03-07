import { openImage, cardSelector, gallery } from "/pages/index.js";

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardElements() {
    this._likeButton = this._card.querySelector(".card__like-button");
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardImage = this._card.querySelector(".card__image");
    this._deleteButton = this._card.querySelector(".card__delete-button");
  }

  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_pressed");
    });

    // Delete button
    this._deleteButton.addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });

    // Image
    this._cardImage.addEventListener("click", this._handleImageClick);
  }

  getCard() {
    // Select the card template and clone it into a variable "card"
    this._card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._getCardElements();

    // Assign the relevent class reference properties into the DOM elements
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    this._setEventListeners();

    // Return the finished card element
    return this._card;
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
    const cardToAdd = createCard(item);
    gallery.append(cardToAdd);
  });
}

function createCard(item) {
  const card = new Card(
    {
      name: item.name,
      link: item.link,
    },
    cardSelector,
    openImage
  );
  return card.getCard();
}

export { Card, initializeCards, createCard };
