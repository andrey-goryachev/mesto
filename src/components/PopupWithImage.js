import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, card) {
    super(selector);
    this._card = card;
    this._photo = this._popup.querySelector('.popup__photo')
    this._decription = this._popup.querySelector('.popup__description')
  }

  open() {
    super.open();
    this._photo.src = this._card.link;
    this._photo.alt = this._card.name;
    this._decription.textContent = this._card.name;
  }
}
