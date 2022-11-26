class FormValidator {
  constructor(settings, form) {
    this._selectors = {
      inputClass: settings.inputClass,
      inputSelector: settings.inputSelector,
      inputErrorClass: settings.inputErrorClass,
      errorClass: settings.errorClass,
      submitButtonSelector: settings.submitButtonSelector,
    };
    this._form = form;
    this._submitButton = this._form.querySelector(this._selectors.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
  }

  // проверка валидности формы
  _isFormValid() {
    return this._inputList.every((input) => {
      return this._isInputValid(input);
    });
  }

  _isInputValid(input) {
    return input.validity.valid;
  }

  // проверка валидности ввода
  _checkValidity(input) {
    console.log("11")
    if (!this._isInputValid(input)) {
     this._showInputError(input, input.validationMessage);
     console.log("22")
    } else {
     this._hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = errorMessage;
    error.classList.add(this._selectors.errorClass);
    input.classList.add(this._selectors.inputErrorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._selectors.errorClass);
    input.classList.remove(this._selectors.inputErrorClass);
  }

  _setButtonState(bool) {
    this._submitButton.disabled = bool;
  }

  // включение валидации
  enableValidation() {
    this._setButtonState(!this._isFormValid());  // изменение состояния кнопки

    console.log('3', this._form)
    console.log('4', this._inputList)
    this._form.addEventListener('input', (event) => {
      console.log('event', event)
      this._inputList.forEach((input) => {
        this._checkValidity(event.target);
        this._setButtonState(!this._isFormValid());
      });
    });
  }

  // сброс валидационных сообщений
  resetValidation() {
    this._setButtonState(!this._isFormValid());
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

// Validation
export const formValidators = {};

export function enableValidation(params) {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    const validator = new FormValidator(params, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
