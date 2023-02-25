// селекторы
const selectorPopupProfile = '.popup_content_profile';
const selectorPopupCard = '.popup_content_card';
const selectorPopupWithConfirmation = '.popup_content_delete-card';
const selectorElementBinActive = '.elements__bin_active';
const selectorElementBin = '.elements__bin_active';
const selectorPopupAvatar = '.popup_content_avatar';
const selectorTemplateCard = '#elements__card';
const selectorPopupContentPhoto = '.popup_content_photo';
const selectorElementsList = '.elements__list';

// имена форм
const profileFormName = 'edit-profile';
const cardFormName = 'edit-card';
const avatarFormName = 'profile-avatar';

// профиль
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const avatar = document.querySelector('.profile__avatar');
const avatarWrapper = document.querySelector('.profile__avatar-wrapper');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const buttonAddCard = document.querySelector('.profile__button_function_add');

// параметры валидации
const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// для апи
const cohortId = 'cohort-60';
const apiOptions = {
  token: '18e4741a-6c44-4105-91a3-2c8e1e3592b8',
  urlBase: `https://mesto.nomoreparties.co/v1/${cohortId}`,
};

export {
  buttonEditProfile,
  profileName,
  profileDescription,
  buttonAddCard,
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
  selectorPopupAvatar,
  avatarWrapper,
  profileFormName,
  cardFormName,
  avatarFormName,
};
