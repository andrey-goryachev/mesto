import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('input');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._buttonStartTextContent = this._buttonSubmit.textContent;
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._buttonSubmit.textContent = 'Сохранение...';
      this._submitForm(e, this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._buttonSubmit.textContent = this._buttonStartTextContent;
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
