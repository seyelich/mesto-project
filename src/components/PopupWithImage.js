import { Popup } from './Popup';
import { popupPhotoImg, popupPhotoTitle } from './constants';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
  }

  open (src, title) {
    console.log('blah')
    this.popupElement.classList.add('popup_opened');
    popupPhotoImg.src = src;
    popupPhotoImg.alt = title;
    popupPhotoTitle.textContent = title;
  }
}

export const popupPhotoCopy = new PopupWithImage('.popup-photo');