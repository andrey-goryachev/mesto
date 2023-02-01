export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._classNamePopupOpened = 'popup_opened';
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._buttonClose = this._popup.querySelector('.popup__cross');
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) this.close();
    });
    this._buttonClose.addEventListener('click', () => this.close());
  }

  open() {
    this._popup.classList.add(this._classNamePopupOpened);
    document.addEventListener('keydown', (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove(this._classNamePopupOpened);
    document.removeEventListener('keydown', (e) => this._handleEscClose(e));
  }
}
