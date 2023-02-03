import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    // this._inputName = this._form.querySelector('.popup__input_content_name')
    // this._inputDescription = this._form.querySelector('.popup__input_content_description')
  }

  _getInputValues() {
    this._inputs = this._form.querySelectorAll('input')
    this._values = {}
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value
    })
    return this._values
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      console.log('start submit form')
      this._submitForm(e, this._getInputValues())
      this.close()
    })
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._form.reset()
  }
}