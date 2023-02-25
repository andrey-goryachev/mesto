export default class Card {
  constructor(card, templateSelector, handleCardClick, handleDeleteCard, userId, handleLike) {
    this._card = card;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this._isOwner = this._card.owner._id === this._userId ? true : false;
    this._handleLike = handleLike;
  }

  _getCardElement() {
    return document.querySelector(this._templateSelector).content.querySelector('.elements__card').cloneNode(true);
  }

  _handleToggleLike(bool) {
    this._buttonLike.classList.toggle('elements__like_active', bool);
  }

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick(this._card);
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteCard(this.cardElement);
    });
    
    this._buttonLike.addEventListener('click', () => {
      this._handleLike(this);
    });
  }

  checkLikes(card) {
    const likes = card.likes;
    if (likes.length !== 0) {
      likes.forEach((like) => {
        if (like._id === this._userId) {
          this._userLikes = true;
          this._buttonLike.classList.toggle('elements__like_active', this._userLikes);
        } else {
          this._userLikes = false;
          this._buttonLike.classList.toggle('elements__like_active', this._userLikes);
        }
      });
    } else {
      this._userLikes = false;
      this._buttonLike.classList.toggle('elements__like_active', this._userLikes);
    }
    this._likesCounter.textContent = card.likes.length;
  }

  generateCard() {
    this.cardElement = this._getCardElement();
    this._buttonDelete = this.cardElement.querySelector('.elements__bin');
    this._buttonLike = this.cardElement.querySelector('.elements__like');
    this._photo = this.cardElement.querySelector('.elements__photo');
    this._title = this.cardElement.querySelector('.elements__title');
    this._likesCounter = this.cardElement.querySelector('.elements__likes-counter');
    this._bin = this.cardElement.querySelector('.elements__bin');

    this._photo.src = this._card.link;
    this._photo.alt = this._card.name;
    this._title.textContent = this._card.name;
    this.cardElement.id = this._card._id;

    if (this._isOwner) {
      this._bin.classList.add('elements__bin_active');
    }

    this.checkLikes(this._card);
    this._setEventListeners();
    return this.cardElement;
  }
}
