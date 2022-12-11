// Профиль
const popupProfile = document.querySelector('.popup_content_profile');
const buttonEditProfile = document.querySelector('.profile__button_function_edit');
const buttonCloseProfileButton = popupProfile.querySelector('.popup__cross');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const popupProfileInputName = popupProfile.querySelector('.popup__input_content_name');
const popupProfileInputDescription = popupProfile.querySelector('.popup__input_content_description');
const formProfilePopup = popupProfile.querySelector('.popup__form');
// Место
const popupCard = document.querySelector('.popup_content_card');
const buttonAddCard = document.querySelector('.profile__button_function_add');
const buttonCloseCard = popupCard.querySelector('.popup__cross');
const popupCardInputName = document.querySelector('.popup__input_content_place');
const popupCardInputLink = document.querySelector('.popup__input_content_link');
const formCardPopup = popupCard.querySelector('.popup__form');
// Карточки с фото
const cardsContainer = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_content_photo');
const imagePopupImage = popupImage.querySelector('.popup__photo')
const descriptionPopupImage = popupImage.querySelector('.popup__description')
const buttonCloseImagePopup = popupImage.querySelector('.popup__cross');
const cardTemplate = document.querySelector('#elements__card').content;


function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}

function openPopupProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function closePopupProfile() {
  closePopup(popupProfile)
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  closePopupProfile();
}

function openPopupCard() {
  openPopup(popupCard)
}

function closePopupCard() {
  closePopup(popupCard);
}

function createCard (card) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const photo = cardElement.querySelector('.elements__photo');
  const title = cardElement.querySelector('.elements__title');
  const buttonDelete = cardElement.querySelector('.elements__bin');
  const buttonLike = cardElement.querySelector('.elements__like')

  photo.src = card.link;
  photo.alt = card.name;
  title.textContent = card.name;

  buttonDelete.addEventListener('click', deleteCard);
  buttonCloseImagePopup.addEventListener('click', closePopupImageCard)
  photo.addEventListener('click', openPopupImageCard);
  buttonLike.addEventListener('click', toggleLike);

  return cardElement
}

function renderCard (card, position = 'top') {
  if (position === 'top') cardsContainer.append(createCard(card));
  if (position === 'bottom') cardsContainer.prepend(createCard(card));
}

function addCardWithForm(e) {
  e.preventDefault();
  const card = {};
  card.name = popupCardInputName.value;
  card.link = popupCardInputLink.value;
  renderCard(card, 'bottom')
  popupCardInputName.value = '';
  popupCardInputLink.value = '';
  closePopupCard();
}
function addAllCardsToPage() {
  initialCards.forEach(item => renderCard(item, 'top'));
}

function deleteCard(e) {
  const clickElement = e.target;
  let deleteElement = clickElement.closest('.elements__card');
  deleteElement.remove();
}

function toggleLike (e) {
  e.target.classList.toggle('elements__like_active');
}

function openPopupImageCard (e) {
  const card = e.target.closest('.elements__card');
  const cardTitle = card.querySelector('.elements__title').textContent;
  openPopup(popupImage)
  imagePopupImage.src = e.target.src;
  imagePopupImage.alt = e.target.alt;
  descriptionPopupImage.textContent = cardTitle;
}

function closePopupImageCard () {
  imagePopupImage.src = '';
  closePopup(popupImage);
  descriptionPopupImage.textContent = '';
}

// События
// Загрузка страницы
document.addEventListener('DOMContentLoaded', addAllCardsToPage);
// Профиль
buttonEditProfile.addEventListener('click', openPopupProfile);
buttonCloseProfileButton.addEventListener('click', closePopupProfile);
formProfilePopup.addEventListener('submit', writeProfile);
// Место
buttonAddCard.addEventListener('click', openPopupCard);
buttonCloseCard.addEventListener('click', closePopupCard);
formCardPopup.addEventListener('submit', addCardWithForm);

