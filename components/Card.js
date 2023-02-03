// import {openPopupImageCard} from '../utils/utils.js'

export default class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
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
    this._buttonDelete = this._cardElement.querySelector('.elements__bin')
    this._buttonLike = this._cardElement.querySelector('.elements__like')
    const photo = this._cardElement.querySelector('.elements__photo');

    this._cardElement.addEventListener('click', () => {
      this._handleCardClick(this._card)
    })

    this._buttonDelete.addEventListener('click', (e) => {
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
    this._photo = this._cardElement.querySelector('.elements__photo');
    this._title = this._cardElement.querySelector('.elements__title');

    this._setEventListeners()

    this._photo.src = this._card.link;
    this._photo.alt = this._card.name;
    this._title.textContent = this._card.name;

    return this._cardElement
  }
}

