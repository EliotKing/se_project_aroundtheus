const gallery = document.querySelector(".gallery__cards");

class Card {
  constructor(data, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.imageHandler = handleImageClick;
  }

  getCard() {
    // Select the card template and clone it into a variable "card"
    const card = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    // Assign the Name and Link from the input object into variables
    const cardName = this.name;
    const cardLink = this.link;
    // Assign the Title and Image from the DOM into variables
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    // Set the relevant values of the DOM elements to those of the input object
    cardImage.setAttribute("src", cardLink);
    cardImage.setAttribute("alt", cardName);
    cardTitle.textContent = cardName;
    // Add event listener to the image
    cardImage.addEventListener("click", this.imageHandler);

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

  createCard() {
    gallery.append(this.getCard());
  }
}

export { Card };
