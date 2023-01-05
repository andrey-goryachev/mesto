import {toggleButtonState} from "./validate.js";


export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings
    this._form = form
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
    this._button = this._form.querySelector(this._settings.submitButtonSelector)
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners(input) {
    input.addEventListener('input', () => {
      this._isValid(input)
      toggleButtonState(this._inputList, this._button, this._settings)
    })
  }

  enableValidation() {
    toggleButtonState(this._inputList, this._button, this._settings)
    this._inputList.forEach((input) => {
      this._setEventListeners(input)
    })
  }
}
