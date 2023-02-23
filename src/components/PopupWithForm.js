import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit')
    this._buttonStartTextContent = this._buttonSubmit.textContent
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputs = this._form.querySelectorAll('input')
    this._values = {}
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value
    })
    return this._values
  }

  _loader() {
    this.close()
    this._buttonSubmit.textContent = this._buttonStartTextContent
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._buttonSubmit.textContent = 'Сохранение...'
      this._submitForm(e, this._getInputValues())
        .then((result) => { this._loader()})
    })
  }

  close() {
    super.close();
    this._form.reset()
  }
}