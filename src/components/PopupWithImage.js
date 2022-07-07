import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open (src, title) {
    this.popupElement.classList.add('popup_opened');
    openPopup(popupPhoto);
    popupPhotoImg.src = src;
    popupPhotoImg.alt = title;
    popupPhotoTitle.textContent = title;
  }
}