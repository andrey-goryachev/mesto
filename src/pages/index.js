import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';
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
  avatar,
  selectorPopupWithConfirmation,
  selectorElementBinActive,
  selectorElementBin,
} from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

// Создать класс Апи
const api = new Api(apiOptions);

// Создать класс профиля
const user = new UserInfo({
  name: profileName,
  info: profileDescription,
  avatar: avatar,
});

// Записать данные из формы в класс профиля
const writeProfile = (e, { name, description }) => {
  e.preventDefault();
  api
    .setProfile({ name, about: description })
    .then((res) => {
      user.setInfo({ name: res.name, info: res.about });
    })
    .catch((err) => console.log(err));
};

// Создать попап-форму для редактирования профиля и включить события
const profilePopup = new PopupWithForm(selectorPopupProfile, writeProfile);
profilePopup.setEventListeners();

const deleteCardOnServer = (deleteElement) => {
  api
    .deleteCard(deleteElement)
    .then((res) => {
      if (res.message === 'Пост удалён') {
        return res;
      }
    })
    .then((res) => {
      popupWithConfirmation.close();
      deleteElement.remove();
      deleteElement = null;
    });
};

const popupWithConfirmation = new PopupWithConfirmation(selectorPopupWithConfirmation, deleteCardOnServer);
popupWithConfirmation.setEventListeners();

// Валидаторы
const validatorProfile = new FormValidator(settingsValidation, formProfilePopup);
const validatorCard = new FormValidator(settingsValidation, formCardPopup);

// Открыть попап фото
const openPopupWithImage = (card) => {
  const popup = new PopupWithImage(selectorPopupContentPhoto, card);
  popup.setEventListeners();
  popup.open();
};

const handleDeleteCard = (e) => {
  let deleteElement = e.target.closest('.elements__card');
  popupWithConfirmation.open(deleteElement);
};

const sendLikeToServer = (cardId, userLikes) => {
  if (userLikes) {
    return api
      .removeLike(cardId)
      .then(card => card)
      .catch((err) => {
        console.log(err);
      });
  } else {
    return api
      .addLike(cardId)
      .then(card => card)
      .catch((err) => {
        console.log(err);
      });
  }
};

// Создать карточку и добавить в список
const renderCard = (card) => {
  const userId = user.getInfo().id;
  const cardElement = new Card(
    card,
    selectorTemplateCard,
    openPopupWithImage,
    handleDeleteCard,
    userId,
    sendLikeToServer
  ).generateCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: api.getInitialCards().then((res) => (res = res.reverse())),
    renderer: renderCard,
  },
  selectorElementsList
);

// Заполнить форму данными из полей профиля
const fillProfileFormFields = () => {
  const userInfo = user.getInfo();
  popupProfileInputName.value = userInfo.name;
  popupProfileInputDescription.value = userInfo.info;
};

// Создать и вставить карточку в разметку
const writeCard = (e, card) => {
  e.preventDefault();
  const formatCard = {};
  formatCard.name = card.place;
  formatCard.link = card.image;
  api
    .addCard(formatCard)
    .then((res) => {
      console.log(res);
      renderCard(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Создать попап-форму добавления карточки и включить события
const cardPopup = new PopupWithForm(selectorPopupCard, writeCard);
cardPopup.setEventListeners();

const getProfile = () => {
  api
    .getProfile()
    .then((res) => {
      user.setInfo({ name: res.name, info: res.about });
      user.setAvatar(res.avatar);
      user.setId(res._id);
    })
    .catch((err) => console.log(err));
};

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  getProfile();
  cardList.renderItem();
});

// Открыть попап-форму редактирования профиля при нажатии кнопки
buttonEditProfile.addEventListener('click', () => {
  fillProfileFormFields();
  profilePopup.open();
});

// Открыть попап-форму добавления карточки при нажатии кнопки
buttonAddCard.addEventListener('click', () => {
  cardPopup.open();
});

// Включить валидацию
validatorProfile.enableValidation();
validatorCard.enableValidation();
