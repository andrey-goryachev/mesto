import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js'
import './index.css'
import {
  // initialCards,
  buttonEditProfile,
  profileName,
  profileDescription,
  popupProfileInputName,
  popupProfileInputDescription,
  formProfilePopup,
  buttonAddCard,
  formCardPopup,
  selectorTemplateCard,
  selectorPopupContentPhoto,
  selectorElementsList,
  selectorPopupProfile,
  selectorPopupCard,
  settingsValidation,
  apiOptions,
  avatar
} from '../utils/constants.js'


// Создать класс Апи
const api = new Api(apiOptions)

// Валидаторы
const validatorProfile = new FormValidator(settingsValidation, formProfilePopup);
const validatorCard = new FormValidator(settingsValidation, formCardPopup);

// Открыть попап фото
const openPopupWithImage = (card) => {
  const popup = new PopupWithImage(selectorPopupContentPhoto, card);
  popup.setEventListeners()
  popup.open()
}



const renderCard = (card) => {
  const cardElement = new Card(card, selectorTemplateCard, openPopupWithImage).generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: api.getInitialCards().then(res => res),
    renderer: renderCard,
  },
  selectorElementsList
);

// Создать карточку и добавить в список
// const renderCard = (card) => {
//   const cardElement = new Card(card, selectorTemplateCard, openPopupWithImage).generateCard();
//   cardList.addItem(cardElement);
// };
//
// // Вставить много карточек в разметку
// const cardList = new Section(
//   {
//     items: cards,
//     renderer: renderCard,
//   },
//   selectorElementsList
// );

// Создать класс профиля
const user = new UserInfo({
  name: profileName,
  info: profileDescription,
  avatar: avatar
})

// Записать данные из формы в класс профиля
const writeProfile = (e, {name, description}) => {
  e.preventDefault();
  api.setProfile({name, about: description})
    .then((res) => {
      user.setUserInfo({name: res.name, info: res.about})
    })
    .catch(err => console.log(err))
}

// Заполнить форму данными из полей профиля
const fillProfileFormFields = () => {
  const userInfo = user.getUserInfo()
  popupProfileInputName.value = userInfo.name;
  popupProfileInputDescription.value = userInfo.info;
}

// Создать попап-форму для редактирования профиля и включить события
const profilePopup = new PopupWithForm(selectorPopupProfile, writeProfile);
profilePopup.setEventListeners()


// Создать и вставить карточку в разметку
const writeCard = (e, card) => {
  e.preventDefault()
  const formatCard = {}
  formatCard.name = card.place
  formatCard.link = card.image
  renderCard(formatCard)
}

// Создать попап-форму добавления карточки и включить события
const cardPopup = new PopupWithForm(selectorPopupCard, writeCard)
cardPopup.setEventListeners()


const recordProfile = () => {
  api.getProfile()
    .then(res => {
      console.log(res)
      user.setUserInfo({name: res.name, info: res.about})
      user.setUserAvatar(res.avatar)
    })
    .catch(err => console.log(err))
}

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  recordProfile();
  cardList.renderItem()
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
