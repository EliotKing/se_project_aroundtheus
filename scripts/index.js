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
