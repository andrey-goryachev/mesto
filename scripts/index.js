// Профиль
const popupProfile = document.querySelector('.popup_content_profile');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const buttonCloseProfileButton = popupProfile.querySelector('.popup__cross');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
const popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');
// Место
const popupCard = document.querySelector('.popup_content_card');
const buttonAddCard = document.querySelector('.profile__button_function_add');
const buttonCloseCard = popupCard.querySelector('.popup__cross');
const popupCardInputName = document.querySelector('.popup__input_content_place');
const popupCardInputLink = document.querySelector('.popup__input_content_link');
const cards = document.querySelector('.elements__list');
const formCardPopup = popupCard.querySelector('.popup__form');
// Карточки с фото
const listElements = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_content_photo');
const imagePopupImage = popupImage.querySelector('.popup__photo')
const descriptionPopupImage = popupImage.querySelector('.popup__description')
const buttonCloseImagePopup = popupImage.querySelector('.popup__cross');
const cardTemplate = document.querySelector('#elements__card').content;


function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}

function openPopupProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile)
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  closePopupProfile();
}

function openPopupCard() {
  // popupCard.classList.add('popup_opened');
  openPopup(popupCard)
}

function closePopupCard() {
  // popupCard.classList.remove('popup_opened');
  closePopup(popupCard);
}

function createCard(e) {
  e.preventDefault();
  const card = {};
  card.name = popupCardInputName.value;
  card.link = popupCardInputLink.value;
  addCard(card, 'bottom')
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
  closePopupCard();
}

function addCard(card, position = 'top') {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__photo').src = card.link;
  cardElement.querySelector('.elements__photo').alt = card.name;
  cardElement.querySelector('.elements__title').textContent = card.name;
  if (position === 'top') cards.append(cardElement);
  if (position === 'bottom') cards.prepend(cardElement);
}

function addAllCardsToPage() {
  initialCards.forEach(item => addCard(item, 'top'));
}

function deleteCard(e) {
  const clickElement = e.target;
  if (clickElement.classList.contains('elements__bin')) {
    let deleteElement = clickElement.closest('.elements__card');
    deleteElement.remove();
  }
}

function toggleLike (e) {
  const clickElement = e.target;
  if (clickElement.classList.contains('elements__like')) {
    clickElement.classList.toggle('elements__like_active');
  }
}

function openPopupImageCard (e) {
  const clickElement = e.target;
  if (clickElement.classList.contains('elements__photo')) {
    const card = clickElement.closest('.elements__card');
    const cardTitle = card.querySelector('.elements__title').textContent;
    openPopup(popupImage)
    imagePopupImage.src = clickElement.src;
    imagePopupImage.alt = clickElement.alt;
    descriptionPopupImage.textContent = cardTitle;
  }
}

function closePopupImageCard () {
  imagePopupImage.src = '';
  closePopup(popupImage);
  descriptionPopupImage.textContent = '';
}

// События
// Загрузка страницы
document.addEventListener('DOMContentLoaded', addAllCardsToPage);
// Профиль
buttonEditProfile.addEventListener('click', openPopupProfile);
buttonCloseProfileButton.addEventListener('click', closePopupProfile);
formProfilePopup.addEventListener('submit', writeProfile);
// Места
buttonAddCard.addEventListener('click', openPopupCard);
buttonCloseCard.addEventListener('click', closePopupCard);
formCardPopup.addEventListener('submit', createCard);
// Лайки
listElements.addEventListener('click', toggleLike);
// Корзина
listElements.addEventListener('click', deleteCard);
// Фото попап
listElements.addEventListener('click', openPopupImageCard);
buttonCloseImagePopup.addEventListener('click', closePopupImageCard)
