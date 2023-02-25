export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._classNamePopupOpened = 'popup_opened';
    this._buttonClose = this._popup.querySelector('.popup__cross');
    this._keyEsc = 'Escape';
  }

  _handleEscClose = (evt) => {
    if (evt.key === this._keyEsc) {
      this.close();
    }
  };

  _clickOutside = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  _clickButtonClose = () => this.close();

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._clickOutside);
    this._buttonClose.addEventListener('click', this._clickButtonClose);
  }

  open() {
    this._popup.classList.add(this._classNamePopupOpened);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._classNamePopupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
