// Профиль
let popupProfile = document.querySelector('.popup_content_profile');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const buttonCloseProfileButton = popupProfile.querySelector('.popup__cross');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__text');
let popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
let popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');
// Место
let popupCard = document.querySelector('.popup_content_card');
const buttonAddCard = document.querySelector('.profile__button_function_add');
const buttonCloseCard = popupCard.querySelector('.popup__cross');
const popupCardInputName = document.querySelector('.popup__input_content_place');
const popupCardInputLink = document.querySelector('.popup__input_content_link');
const cards = document.querySelector('.elements__list');
const formCardPopup = popupCard.querySelector('.popup__form');
const initialCards = [
  {
    name: 'Водопад Шумка',
    link: 'https://images.unsplash.com/photo-1634665609954-7aaf882505de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8JUQwJTkyJUQwJUJFJUQwJUI0JUQwJUJFJUQwJUJGJUQwJUIwJUQwJUI0JTIwJUQwJUE4JUQxJTgzJUQwJUJDJUQwJUJBJUQwJUIwfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: 'Домбай',
    link: 'https://images.unsplash.com/photo-1595849948760-cc6dcea6c162?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8JUQwJTk0JUQwJUJFJUQwJUJDJUQwJUIxJUQwJUIwJUQwJUI5fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: 'Кондуки',
    link: 'https://images.unsplash.com/photo-1619651797913-fa18e9ca7f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8JUQwJTlBJUQwJUJFJUQwJUJEJUQwJUI0JUQxJTgzJUQwJUJBJUQwJUI4fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: 'Териберка',
    link: 'https://images.unsplash.com/photo-1661517753182-40bc3b932479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRlcmliZXJrYXxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1617835594990-7cd5a9b5d153?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFpa2FsfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: 'Телецкое озеро',
    link: 'https://images.unsplash.com/photo-1596003903067-bf5762ad5c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fCVEMSU4MiVEMCVCNSVEMCVCQiVEMCVCNSVEMSU4NiVEMCVCQSVEMCVCRSVEMCVCNXxlbnwwfHwwfHw%3D&w=1000&q=80'
  },
];
// Карточки с фото
const listElements = document.querySelector('.elements__list');
let popupImage = document.querySelector('.popup_content_photo');
let imagePopupImage = popupImage.querySelector('.popup__photo')
let descriptionPopupImage = popupImage.querySelector('.popup__description')
const buttonCloseImagePopup = popupImage.querySelector('.popup__cross');
const cardTemplate = document.querySelector('#elements__card').content;


function openPopupProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
  popupProfile.classList.add('popup_opened');
}

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  closePopupProfile();
}

function openPopupCard() {
  popupCard.classList.add('popup_opened');
}

function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}

function createCard(e) {
  e.preventDefault();
  let card = {};
  card.name = popupCardInputName.value;
  card.link = popupCardInputLink.value;
  addCard(card, 'bottom')
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
  closePopupCard();
}

function addCard(card, position = 'top') {
  let cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
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
  let clickElement = e.target;
  if (clickElement.classList.contains('elements__bin')) {
    let deleteElement = clickElement.closest('.elements__card');
    deleteElement.remove();
  }
}

function toggleLike (e) {
  let clickElement = e.target;
  if (clickElement.classList.contains('elements__like')) {
    e.target.classList.toggle('elements__like_active');
  }
}

function openPopupImageCard (e) {
  let clickElement = e.target;
  if (clickElement.classList.contains('elements__photo')) {
    const card = clickElement.closest('.elements__card');
    const cardTitle = card.querySelector('.elements__title').textContent;
    popupImage.classList.add('popup_opened');
    imagePopupImage.src = clickElement.src;
    imagePopupImage.alt = clickElement.alt;
    descriptionPopupImage.textContent = cardTitle;
  }
}

function closePopupImageCard () {
  imagePopupImage.src = '';
  popupImage.classList.remove('popup_opened');
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
