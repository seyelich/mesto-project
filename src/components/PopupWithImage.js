import { Popup } from './Popup';

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open () {
    this._popup.classList.add('popup_opened');
    popupPhotoImg.src = cardLinkValue;
    popupPhotoImg.alt = cardNameValue;
    popupPhotoTitle.textContent = cardNameValue;
  }
}

export { PopupWithImage };