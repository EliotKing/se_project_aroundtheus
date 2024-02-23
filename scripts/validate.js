function enableValidation(config) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
enableValidation({
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
    });
  });
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
    disableSubmit(formElement, config.submitButtonSelector);
  } else {
    hideInputError(formElement, inputElement, config);
    enableSubmit(formElement, config.submitButtonSelector);
  }
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

function enableSubmit(form, buttonSelector) {
  button = form.querySelector(buttonSelector);
  button.disabled = false;
}
function disableSubmit(form, buttonSelector) {
  button = form.querySelector(buttonSelector);
  button.disabled = true;
}
