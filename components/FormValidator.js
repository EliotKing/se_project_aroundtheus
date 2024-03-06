class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }
  // Set input event listeners on all the inputs of a given form
  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const validator = this;

    this._inputList.forEach((input) => {
      input.addEventListener("input", function () {
        validator._checkInputValidity(input);
      });
    });
  }
  // Check a specified input's validity and display or hide the error message as necessary.
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._displayInputError(true, input);
    } else {
      this._displayInputError(false, input);
    }
    this._checkFormValidity();
  }
  // Check the overall form validity, ensuring that all inputs are valid and enabling or disabling the
  // submit button respectively
  _checkFormValidity() {
    if (
      this._inputList.some((input) => {
        return input.validity.valid === false;
      })
    ) {
      this._setSubmitState(false);
    } else {
      this._setSubmitState(true);
    }
  }
  // Show or hide the error message, using the isError parameter (true to show it and flase to hide it)
  _displayInputError(isError, input) {
    const errorMessage = input.validationMessage;
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    if (isError) {
      input.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    } else if (!isError) {
      input.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  }
  // Take submitState (true to enable submit, false to disable), the form, and the class selector of the
  // submit button, and enable or disable the button respectively
  _setSubmitState(submitState) {
    const button = this._form.querySelector(this._submitButtonSelector);
    if (submitState) {
      button.disabled = false;
    } else if (!submitState) {
      button.disabled = true;
    }
  }

  // Public methods
  enableValidation() {
    this._setEventListeners();
  }
  resetValidation() {
    const validator = this;
    this._inputList.forEach((input) => {
      validator._checkInputValidity(input);
    });
  }
}

export { FormValidator };
