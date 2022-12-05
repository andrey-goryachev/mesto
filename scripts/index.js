let editButton = document.querySelector('.profile__button_function_edit');
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__cross')
let profileName = document.querySelector('.profile__title')
let profileDescription = document.querySelector('.profile__text')
let popupInputName = document.querySelector('.popup__input_content_name');
let popupInputDescription = document.querySelector('.popup__input_content_description');
let formPopup = document.querySelector('.popup__form');
let cards = document.querySelector('.elements__list');
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

function openPopup() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

function addCard(card) {
  const cardTemplate = document.querySelector('#elements__card').content;
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__photo').src = card.link;
  cardElement.querySelector('.elements__photo').alt = card.name;
  cardElement.querySelector('.elements__title').textContent = card.name;
  cards.append(cardElement);
}

function addAllCards () {
  initialCards.forEach(item => addCard(item))
}

document.addEventListener('DOMContentLoaded', addAllCards);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formPopup.addEventListener('submit', writeProfile);
