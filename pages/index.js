import initialCards from '../utils/cards.js';
import settingsValidation from '../utils/validateSettings.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
// import { closePopup, openPopup } from '../utils/utils.js';
import Section from '../components/Section.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";

// Профиль
const popupProfile = document.querySelector('.popup_content_profile');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
const popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');
// Место
const popupCard = document.querySelector('.popup_content_card');
const buttonAddCard = document.querySelector('.profile__button_function_add');
const popupCardInputName = document.querySelector('.popup__input_content_place');
const popupCardInputLink = document.querySelector('.popup__input_content_link');
const formCardPopup = popupCard.querySelector('.popup__form');
// Карточки с фото
const cardsContainer = document.querySelector('.elements__list');
const selectorTemplateCard = '#elements__card';
// Общие
const buttonCloseList = document.querySelectorAll('.popup__cross');
// Валидаторы
const validatorProfile = new FormValidator(settingsValidation, formProfilePopup);
const validatorCard = new FormValidator(settingsValidation, formCardPopup);

// function closePopupOverLay(evt) {
//   if (evt.target.classList.contains('popup')) {
//     closePopup(evt.target);
//   }
// }

// function openPopupProfile() {
//   popupProfileInputName.value = profileName.textContent;
//   popupProfileInputDescription.value = profileDescription.textContent;
//   validatorProfile.toggleButtonState();
//   openPopup(popupProfile);
// }


// function openPopupCard() {
//   openPopup(popupCard);
// }

// const popupWithImage = new Popup('.popup_content_photo');
// popupWithImage.setEventListeners();


new Popup('.popup_content_photo').setEventListeners()

const openPopupWithImage = (card) => {
  const popup = new PopupWithImage('.popup_content_photo', card);
  popup.open()
}

const renderCard = (card) => {
  const cardElement = new Card(card, selectorTemplateCard, openPopupWithImage).generateCard();

  // cardElement.addEventListener('click', () => {
  //   const popupWithImage = new PopupWithImage('.popup_content_photo', card);
  //   popupWithImage.open();
  // });
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  '.elements__list'
);

// function addCardWithForm(e) {
//   e.preventDefault();
//   const card = {};
//   card.name = popupCardInputName.value;
//   card.link = popupCardInputLink.value;
//
//   new Section(
//     {
//       items: [card],
//       renderer: renderCard,
//     },
//     '.elements__list'
//   ).renderItem();
//   formCardPopup.reset();
//   validatorCard.toggleButtonState();
//   // closePopup(popupCard);
// }

// Загрузка страницы
// document.addEventListener('DOMContentLoaded', addAllCardsToPage);
document.addEventListener('DOMContentLoaded', () => {
  cardList.renderItem();
});

// Профиль
// buttonEditProfile.addEventListener('click', openPopupProfile);
// formProfilePopup.addEventListener('submit', writeProfile);

const user = new UserInfo({selectorName: profileName, selectorInfo: profileDescription})
const writeProfile = (e, {name, description}) => {
  e.preventDefault();
  // console.log(name, info)
  user.setUserInfo({name: name, info: description})
  // console.log(user.getUserInfo())

  // closePopup(popupProfile);
}

const fillProfileFormFields = () => {
  const userInfo = user.getUserInfo()
  popupProfileInputName.value = userInfo.name;
  popupProfileInputDescription.value = userInfo.info;
}


const profilePopup = new PopupWithForm('.popup_content_profile', writeProfile);
profilePopup.setEventListeners()
buttonEditProfile.addEventListener('click', () => {
  fillProfileFormFields()
  profilePopup.open();
});

// Место
// buttonAddCard.addEventListener('click', () => {
//   popupWithImage.open()});
// formCardPopup.addEventListener('submit', addCardWithForm);

// Закрыть поп-ап на крестик и по клику на пустом месте
// buttonCloseList.forEach((btn) => {
//   const popup = btn.closest('.popup');
//   popup.addEventListener('mousedown', (evt) => closePopupOverLay(evt, popup));
//   btn.addEventListener('click', () => closePopup(popup));
// });

// Включить валидацию
validatorProfile.enableValidation();
validatorCard.enableValidation();
