export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._classNamePopupOpened = 'popup_opened';
    this._buttonClose = this._popup.querySelector('.popup__cross');
  }

  //
  // _handleEscClose(e) {
  //   if (e.key === 'Escape') {
  //     this.close()
  //     // document.removeEventListener('keydown', this._handleEscClose)
  //   }
  // }
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      console.log('escape')
      this.close()
    }
  }

  _eventClickOutside = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  };

  _eventButtonClose = () => this.close()

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._eventClickOutside);
    this._buttonClose.addEventListener('click', this._eventButtonClose);
    // document.addEventListener('keydown', this._handleEscClose.bind(this));
    // document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('keydown', (e) => {
      this._handleEscClose(e)
    } );
  }

  // deleteEventListeners() {
  //   this._popup.removeEventListener('mousedown', this._eventClickOutside);
  //   this._buttonClose.removeEventListener('click', this._eventButtonClose);
  // }

  open() {
    console.log('open popup');
    this._popup.classList.add(this._classNamePopupOpened);
    // this.setEventListeners();
  }

  close() {
    console.log('close popup');
    // this.deleteEventListeners();
    this._popup.classList.remove(this._classNamePopupOpened);
  }
}
