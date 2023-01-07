const popupImage = document.querySelector('.popup_content_photo');
const imagePopupImage = popupImage.querySelector('.popup__photo')
const descriptionPopupImage = popupImage.querySelector('.popup__description')


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
