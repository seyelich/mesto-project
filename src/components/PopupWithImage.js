import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open () {
    this.popup.classList.add('popup_opened');
    popupPhotoImg.src = cardLinkValue;
    popupPhotoImg.alt = cardNameValue;
    popupPhotoTitle.textContent = cardNameValue;
  }
}

export { PopupWithImage };