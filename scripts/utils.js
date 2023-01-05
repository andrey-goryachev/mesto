const popupImage = document.querySelector('.popup_content_photo');
const imagePopupImage = popupImage.querySelector('.popup__photo')
const descriptionPopupImage = popupImage.querySelector('.popup__description')

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

export const toggleButtonState = (inputList, button, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settingsObject.inactiveButtonClass)
    button.disabled = true
  } else {
    button.classList.remove(settingsObject.inactiveButtonClass)
    button.disabled = false
  }
}

export const closePopup =(popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEscape);
}

function closePopupKeyEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEscape);
}

export function openPopupImageCard(card) {
  openPopup(popupImage)
  imagePopupImage.src = card.link;
  imagePopupImage.alt = card.name;
  descriptionPopupImage.textContent = card.name;
}
