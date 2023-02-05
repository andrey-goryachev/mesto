import initialCards from '../utils/cards.js';
import settingsValidation from '../utils/validateSettings.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import './index.css'
import {
  buttonEditProfile,
  profileName,
  profileDescription,
  popupProfileInputName,
  popupProfileInputDescription,
  formProfilePopup,
  buttonAddCard,
  formCardPopup,
  selectorTemplateCard
} from '../utils/constants.js'


// Валидаторы
const validatorProfile = new FormValidator(settingsValidation, formProfilePopup);
const validatorCard = new FormValidator(settingsValidation, formCardPopup);

// Открыть попап фото
const openPopupWithImage = (card) => {
  const popup = new PopupWithImage('.popup_content_photo', card);
  popup.setEventListeners()
  popup.open()
}

// Создать карточку и добавить в список
const renderCard = (card) => {
  const cardElement = new Card(card, selectorTemplateCard, openPopupWithImage).generateCard();
  cardList.addItem(cardElement);
};

// Вставить много карточек в разметку
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  '.elements__list'
);

// Создать класс профиля
const user = new UserInfo({selectorName: profileName, selectorInfo: profileDescription})

// Записать данные из формы в класс профиля
const writeProfile = (e, {name, description}) => {
  e.preventDefault();
  user.setUserInfo({name: name, info: description})
}

// Заполнить форму данными из полей профиля
const fillProfileFormFields = () => {
  const userInfo = user.getUserInfo()
  popupProfileInputName.value = userInfo.name;
  popupProfileInputDescription.value = userInfo.info;
}

// Создать попап-форму для редактирования профиля и включить события
const profilePopup = new PopupWithForm('.popup_content_profile', writeProfile);
profilePopup.setEventListeners()

// Создать и вставить карточку в разметку
const writeCard = (e, card) => {
  e.preventDefault()
  const formatCard = {}
  formatCard.name = card.place
  formatCard.link = card.image
  new Section(
    {
      items: [formatCard],
      renderer: renderCard,
    },
    '.elements__list'
  ).renderItem();
}

// Создать попап-форму добавления карточки и включить события
const cardPopup = new PopupWithForm('.popup_content_card', writeCard)
cardPopup.setEventListeners()

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  cardList.renderItem();
});

// Открыть попап-форму редактирования профиля при нажатии кнопки
buttonEditProfile.addEventListener('click', () => {
  fillProfileFormFields()
  profilePopup.open();
});

// Открыть попап-форму добавления карточки при нажатии кнопки
buttonAddCard.addEventListener('click', () => {
  cardPopup.open()
})

// Включить валидацию
validatorProfile.enableValidation();
validatorCard.enableValidation();
