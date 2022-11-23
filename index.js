let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__cross')

function openPopup() {
  popup.className = popup.className + ' popup_opened'
}

function closePopup() {
  popup.className = 'popup'
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
