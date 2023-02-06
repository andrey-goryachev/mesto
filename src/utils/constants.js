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

const selectorPopupProfile = '.popup_content_profile';
const selectorPopupCard = '.popup_content_card';
const popupProfile = document.querySelector(selectorPopupProfile);
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
const popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');

const popupCard = document.querySelector(selectorPopupCard);
const buttonAddCard = document.querySelector('.profile__button_function_add');
const formCardPopup = popupCard.querySelector('.popup__form');
const selectorTemplateCard = '#elements__card';
const selectorPopupContentPhoto = '.popup_content_photo';
const selectorElementsList = '.elements__list';

const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


export {
  initialCards,
  buttonEditProfile,
  profileName,
  profileDescription,
  popupProfileInputName,
  popupProfileInputDescription,
  buttonAddCard,
  formProfilePopup,
  formCardPopup,
  selectorTemplateCard,
  selectorPopupContentPhoto,
  selectorElementsList,
  selectorPopupProfile,
  selectorPopupCard,
  settingsValidation
}