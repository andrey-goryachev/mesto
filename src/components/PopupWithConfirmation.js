import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
  constructor(selector, deleteCardOnServer) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._buttonConfirm = this._popup.querySelector('.popup__submit')
    this._deleteCardOnServer = deleteCardOnServer
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      console.log('click button confirm')
      this._deleteCardOnServer()
    })
  }
}