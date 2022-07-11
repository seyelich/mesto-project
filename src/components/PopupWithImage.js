import { Popup } from './Popup';
import { popupPhotoImg, popupPhotoTitle } from './constants';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this.open = this.open.bind(this);
  }

  open (src, title) {
    super.open();
    popupPhotoImg.src = src;
    popupPhotoImg.alt = title;
    popupPhotoTitle.textContent = title;
  }
}

export const popupPhotoCopy = new PopupWithImage('.popup-photo');