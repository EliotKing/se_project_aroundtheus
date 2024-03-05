console.log("test 2");
function enableValidation(config) {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}
enableValidation({
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
// Set input event listeners on all the inputs of a given form
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener("input", function () {
      checkInputValidity(form, inputList, input, config);
    });
  });
}
// Check a specified input's validity and display or hide the error message as necessary.
function checkInputValidity(form, inputList, input, config) {
  if (!input.validity.valid) {
    displayInputError(true, form, input, input.validationMessage, config);
  } else {
    displayInputError(false, form, input, input.validationMessage, config);
  }
  checkFormValidity(form, inputList, config.submitButtonSelector);
}
// Check the overall form validity, ensuring that all inputs are valid and enabling or disabling the
// submit button respectively
function checkFormValidity(form, inputList, buttonSelector) {
  if (
    inputList.some((input) => {
      return input.validity.valid === false;
    })
  ) {
    setSubmitState(false, form, buttonSelector);
  } else {
    setSubmitState(true, form, buttonSelector);
  }
}
// Show or hide the error message, using the isError parameter (true to show it and flase to hide it)
function displayInputError(isError, form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (isError) {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  } else if (!isError) {
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  }
}
// Take submitState (true to enable submit, false to disable), the form, and the class selector of the
// submit button, and enable or disable the button respectively
function setSubmitState(submitState, form, buttonSelector) {
  button = form.querySelector(buttonSelector);
  if (submitState) {
    button.disabled = false;
  } else if (!submitState) {
    button.disabled = true;
  }
}
