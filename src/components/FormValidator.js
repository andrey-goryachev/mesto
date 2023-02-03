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
      this.toggleButtonState()
    })
  }

  enableValidation() {
    this.toggleButtonState()
    this._inputList.forEach((input) => {
      this._setEventListeners(input)
    })
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._settings.inactiveButtonClass)
      this._button.disabled = true
    } else {
      this._button.classList.remove(this._settings.inactiveButtonClass)
      this._button.disabled = false
    }
  }
}
