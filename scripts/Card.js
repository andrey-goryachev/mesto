import {openPopupImageCard} from './index.js'

export default class Card {
  constructor(card, templateSelector) {
    this._card = card;
    this._templateSelector = templateSelector;
  }

  _getCardElement() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
  }

  _handleDeleteCard(e) {
    e.target.closest('.elements__card').remove();
  }

  _handleToggleLike(e) {
    e.target.classList.toggle('elements__like_active');
  }

  _setEventListeners() {
    const buttonDelete = this._cardElement.querySelector('.elements__bin')
    const buttonLike = this._cardElement.querySelector('.elements__like')
    const photo = this._cardElement.querySelector('.elements__photo');

    buttonDelete.addEventListener('click', this._handleDeleteCard);
    buttonLike.addEventListener('click', this._handleToggleLike);
    photo.addEventListener('click', () => openPopupImageCard(this._card));
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

