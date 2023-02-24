import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
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
  selectorPopupAvatar,
  formAvatarPopup
} from '../utils/constants.js';
import './index.css';

let sectionCards;

// Валидаторы
const validatorProfile = new FormValidator(settingsValidation, formProfilePopup);
const validatorCard = new FormValidator(settingsValidation, formCardPopup);
const validatorAvatar = new FormValidator(settingsValidation, formAvatarPopup)

// Включить валидацию
validatorProfile.enableValidation();
validatorCard.enableValidation();
validatorAvatar.enableValidation()

const toggleCardButtonState = () => { 
  validatorCard.toggleButtonState()
 }

const toggleAvatarButtonState = () => { 
  validatorAvatar.toggleButtonState()
 }


// Создать класс Апи
const api = new Api(apiOptions);

// Создать попоп для аватара
const avatarPopup = new PopupWithForm(selectorPopupAvatar, (e, { avatar }) => {
  return api
    .updateAvatar(avatar)
    .then((res) => {
      return user.setAvatar(res.avatar);
    })
    .catch((err) => console.log(err));
}, toggleAvatarButtonState);
avatarPopup.setEventListeners()

// Создать класс профиля
const user = new UserInfo({
  name: profileName,
  about: profileDescription,
  avatar: avatar,
  changeAvatar: () => {
    avatarPopup.open()
  }
});

// Создать попап для профиля
const profilePopup = new PopupWithForm(selectorPopupProfile, (e, { name, about }) => {
  e.preventDefault();
  return api.setProfile({ name, about })
    .then((res) => {
      return user.setInfo({ name: res.name, about: res.about });
    })
    .catch((err) => console.log(err));
});
profilePopup.setEventListeners();


// Создать попап для подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(selectorPopupWithConfirmation, (deleteElement) => {
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
    })
    .catch((err) => console.log(err));;
});
popupWithConfirmation.setEventListeners();


// Создать и открыть попап для карточки
const openPopupWithImage = (card) => {
  const popup = new PopupWithImage(selectorPopupContentPhoto);
  popup.setEventListeners();
  popup.open(card);
};
 
const handleDeleteCard = (e) => {
  let deleteElement = e.target.closest('.elements__card');
  popupWithConfirmation.open(deleteElement);
};

// Отправить лайк на сервер
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

// const handleLike = () => {

// }

// Создать карточку и добавить в список
const renderCard = (card) => {
  const userId = user.getInfo().id;
  return new Card(
    card,
    selectorTemplateCard,
    openPopupWithImage,
    handleDeleteCard,
    userId,
    sendLikeToServer
  ).generateCard();
};


const createSection = (cards) => {
  return new Section(
  {
    items: cards,
    renderer: renderCard,
  },
  selectorElementsList
  )
};

// Создать и вставить карточку в разметку
const writeCard = (e, card) => {
  e.preventDefault();
  const formatCard = {};
  formatCard.name = card.place;
  formatCard.link = card.image;
  return api.addCard(formatCard)
    .then((res) => {
      validatorCard.toggleButtonState()
      return sectionCards.addItem(renderCard(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Создать попап-форму добавления карточки и включить события
const cardPopup = new PopupWithForm(selectorPopupCard, writeCard, toggleCardButtonState);
cardPopup.setEventListeners();

// Получить и записать профиль и карточки
const getProfileAndCards = () => {
  const profilePromise = api.getProfile()
  const cardsPromise = api.getInitialCards()
  Promise.all([profilePromise, cardsPromise])
    .then((results) => {
      const profile = results[0]
      const cards = results[1].reverse()

      user.setInfo({ name: profile.name, about: profile.about });
      user.setAvatar(profile.avatar);
      user.setId(profile._id);
      user.setEventListeners()

      sectionCards = createSection(cards)
      sectionCards.renderItem();
    })
    .catch((err) => console.log(err));
}


// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  getProfileAndCards()
});

// Открыть попап-форму редактирования профиля при нажатии кнопки
buttonEditProfile.addEventListener('click', () => {
  profilePopup.setInputValues(user.getInfo())
  profilePopup.open();
});

// Открыть попап-форму добавления карточки при нажатии кнопки
buttonAddCard.addEventListener('click', () => {
  cardPopup.open();
});
