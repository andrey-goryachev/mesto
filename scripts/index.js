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
const popupImage = document.querySelector('.popup_content_photo');
const imagePopupImage = popupImage.querySelector('.popup__photo')
const descriptionPopupImage = popupImage.querySelector('.popup__description')
const cardTemplate = document.querySelector('#elements__card').content;
// Общие
const buttonCloseList = document.querySelectorAll('.popup__cross');

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}

function closePopupOverLay (popup) {
  popup.addEventListener('click', () => {
    closePopup(popup)
  })
}

function openPopup (popup) {
  const popupContainer = popup.querySelector('.popup__container')
  popupContainer.addEventListener('click', (evt) => {
    evt.stopPropagation()
  })
  popup.classList.add('popup_opened');
  closePopupOverLay(popup)
}

function openPopupProfile() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupProfileInputName.value;
  profileDescription.textContent = popupProfileInputDescription.value;
  closePopup(popupProfile)
}

function openPopupCard() {
  openPopup(popupCard)
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
  photo.addEventListener('click', () => openPopupImageCard(card));
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
  formCardPopup.reset();
  closePopup(popupCard);
}
function addAllCardsToPage() {
  initialCards.forEach(item => renderCard(item, 'top'));
}

function deleteCard(e) {
  e.target.closest('.elements__card').remove();
}

function toggleLike (e) {
  e.target.classList.toggle('elements__like_active');
}

function openPopupImageCard (card) {
  openPopup(popupImage)
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  descriptionPopupImage.textContent = card.name;
}


// Загрузка страницы
document.addEventListener('DOMContentLoaded', addAllCardsToPage);
// Профиль
buttonEditProfile.addEventListener('click', openPopupProfile);
formProfilePopup.addEventListener('submit', writeProfile);
// Место
buttonAddCard.addEventListener('click', openPopupCard);
formCardPopup.addEventListener('submit', addCardWithForm);
// Закрыть попап
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})


