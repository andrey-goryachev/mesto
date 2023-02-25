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
  formAvatarPopup,
  avatarWrapper,
} from '../utils/constants.js';
import './index.css';

let sectionCards;


const formValidators = {}
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(settingsValidation);

// Создать класс Апи
const api = new Api(apiOptions);

// Создать попоп для аватара
const avatarPopup = new PopupWithForm(
  selectorPopupAvatar,
  (e, { avatar }) => {
    return api
      .updateAvatar(avatar)
      .then((res) => {
        return user.setAvatar(res.avatar);
      })
      .catch((err) => console.log(err));
  },
  // toggleAvatarButtonState
);
avatarPopup.setEventListeners();

// Создать класс профиля
const user = new UserInfo({
  name: profileName,
  about: profileDescription,
  avatar: avatar,
});

// Создать попап для профиля
const profilePopup = new PopupWithForm(selectorPopupProfile, (e, { name, about }) => {
  e.preventDefault();
  return api
    .setProfile({ name, about })
    .then((res) => {
      return user.setInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        _id: res._id,
      });
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
    .catch((err) => console.log(err));
});
popupWithConfirmation.setEventListeners();



const popupWithImage = new PopupWithImage(selectorPopupContentPhoto);
popupWithImage.setEventListeners();


const openPopupWithImage = (card) => {
  popupWithImage.open(card);
};


const handleDeleteCard = (cardElement) => {
  popupWithConfirmation.open(cardElement);
};

// Отправить лайк на сервер
const sendLikeToServer = (cardId, userLikes) => {
  if (userLikes) {
    return api
      .removeLike(cardId)
      .then((card) => card)
      .catch((err) => {
        console.log(err);
      });
  } else {
    return api
      .addLike(cardId)
      .then((card) => card)
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


// тут иправить создавать экхемпляр можно только один раз
const createSection = (cards) => {
  return new Section(
    {
      items: cards,
      renderer: renderCard,
    },
    selectorElementsList
  );
};

// Создать и вставить карточку в разметку
const writeCard = (e, card) => {
  e.preventDefault();
  const formatCard = {};
  formatCard.name = card.place;
  formatCard.link = card.image;
  return api
    .addCard(formatCard)
    .then((res) => {
      // validatorCard.toggleButtonState();
      sectionCards.prependItem(renderCard(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Создать попап-форму добавления карточки и включить события
const cardPopup = new PopupWithForm(selectorPopupCard, writeCard);
cardPopup.setEventListeners();

// Получить и записать профиль и карточки
const getProfileAndCards = () => {
  const profilePromise = api.getProfile();
  const cardsPromise = api.getInitialCards();
  Promise.all([profilePromise, cardsPromise])
    .then(([profile, cards]) => {
      cards = cards.reverse()

      user.setInfo({
        name: profile.name,
        about: profile.about,
        avatar: profile.avatar,
        _id: profile._id,
      });

      sectionCards = createSection(cards);
      sectionCards.renderItem();
    })
    .catch((err) => console.log(err));
};

// Загрузка страницы
document.addEventListener('DOMContentLoaded', () => {
  getProfileAndCards();
});

// Открыть попап-форму редактирования профиля при нажатии кнопки
buttonEditProfile.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation()
  profilePopup.setInputValues(user.getInfo());
  profilePopup.open();
});

// Открыть попап-форму добавления карточки при нажатии кнопки
buttonAddCard.addEventListener('click', () => {
  formValidators['edit-card'].resetValidation()
  cardPopup.open();
});

avatarWrapper.addEventListener('click', () => {
  formValidators['profile-avatar'].resetValidation()
  avatarPopup.open();
});
