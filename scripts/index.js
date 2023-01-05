import Card from './Card.js'
import {toggleButtonState, closePopup, openPopup} from "./utils.js";


// Профиль
const popupProfile = document.querySelector('.popup_content_profile');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
const popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');
const popupProfileInputList = Array.from(formProfilePopup.querySelectorAll(settingsValidation.inputSelector));
const buttonSubmitProfile = formProfilePopup.querySelector(settingsValidation.submitButtonSelector);
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


function closePopupOverLay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function openPopupProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
  toggleButtonState(popupProfileInputList, buttonSubmitProfile, settingsValidation);
  openPopup(popupProfile);
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  closePopup(popupProfile);
}

function openPopupCard() {
  openPopup(popupCard);
}

function createCard(card) {
  return new Card(card,selectorTemplateCard).generateCard()
}

function renderCard(card, position = 'top') {
  if (position === 'top') cardsContainer.append(createCard(card));
  if (position === 'bottom') cardsContainer.prepend(createCard(card));
}

function addCardWithForm(e) {
  e.preventDefault();
  const card = {};
  const buttonSubmit = e.submitter;

  card.name = popupCardInputName.value;
  card.link = popupCardInputLink.value;
  renderCard(card, 'bottom');
  formCardPopup.reset();
  buttonSubmit.classList.add(settingsValidation.inactiveButtonClass);
  buttonSubmit.disabled = true;
  closePopup(popupCard);
}

function addAllCardsToPage() {
  initialCards.forEach(item => renderCard(item, 'top'));
}

// Загрузка страницы
document.addEventListener('DOMContentLoaded', addAllCardsToPage);

// Профиль
buttonEditProfile.addEventListener('click', openPopupProfile);
formProfilePopup.addEventListener('submit', writeProfile);

// Место
buttonAddCard.addEventListener('click', openPopupCard);
formCardPopup.addEventListener('submit', addCardWithForm);

// Закрыть поп-ап на крестик и по клику на пустом месте
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', (evt) => closePopupOverLay(evt, popup));
  btn.addEventListener('click', () => closePopup(popup));
})

