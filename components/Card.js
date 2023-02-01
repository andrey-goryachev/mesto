// import {openPopupImageCard} from '../utils/utils.js'

export default class Card {
  constructor(card, templateSelector) {
    this._card = card;
    this._templateSelector = templateSelector;
  }

  _getCardElement() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null
  }

  _handleToggleLike() {
    this._buttonLike.classList.toggle('elements__like_active');
  }

  _setEventListeners() {
    const buttonDelete = this._cardElement.querySelector('.elements__bin')
    this._buttonLike = this._cardElement.querySelector('.elements__like')
    const photo = this._cardElement.querySelector('.elements__photo');

    buttonDelete.addEventListener('click', (e) => {
      e.stopPropagation()
      this._handleDeleteCard()
    });
    this._buttonLike.addEventListener('click', (e) => {
      e.stopPropagation()
      this._handleToggleLike()
    });
  }

  generateCard() {
    this._cardElement = this._getCardElement()
    const photo = this._cardElement.querySelector('.elements__photo');
    const title = this._cardElement.querySelector('.elements__title');

    this._setEventListeners()

    photo.src = this._card.link;
    photo.alt = this._card.name;
    title.textContent = this._card.name;

    return this._cardElement
  }
}

