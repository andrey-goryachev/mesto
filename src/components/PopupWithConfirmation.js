import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, deleteCardOnServer) {
    super(selector);
    this._popup = document.querySelector(this._selector);
    this._buttonConfirm = this._popup.querySelector('.popup__submit');
    this._deleteCardOnServer = deleteCardOnServer;
  }

  _deleteElement = () => {
    this._deleteCardOnServer(this._elementForDelete);
  };

  open(elementForDelete) {
    super.open();
    this._elementForDelete = elementForDelete;
    this._buttonConfirm.addEventListener('click', this._deleteElement);
  }

  close() {
    super.close();
    this._buttonConfirm.removeEventListener('click', this._deleteElement);
  }
}
