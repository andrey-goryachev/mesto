let editButton = document.querySelector('.profile__button_function_edit');
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__cross')
let profileName = document.querySelector('.profile__title')
let profileDescription = document.querySelector('.profile__text')
let popupInputName = document.querySelector('.popup__input_content_name');
let popupInputDescription = document.querySelector('.popup__input_content_description');
let formPopup = document.querySelector('.popup__form');

function openPopup() {
  popupInputName.value = profileName.textContent;
  popupInputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function writeProfile(e) {
  e.preventDefault();
  profileName.textContent = popupInputName.value;
  profileDescription.textContent = popupInputDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formPopup.addEventListener('submit', writeProfile);
