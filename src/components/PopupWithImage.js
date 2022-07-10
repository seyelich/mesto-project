import { Popup } from './Popup';
import { popupPhotoImg, popupPhotoTitle } from './constants';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this.open = this.open.bind(this);// САВ это чтобы можно было вызывать метод из другого класса без потери контекста
  }

  open (src, title) {
    super.setEventListeners();// САВ Это я пока добавил, чтобы закрывалось нормально, сам посмотришь как лучше.
    this._popupElement.classList.add('popup_opened');
    popupPhotoImg.src = src;
    popupPhotoImg.alt = title;
    popupPhotoTitle.textContent = title;
  }
}

export const popupPhotoCopy = new PopupWithImage('.popup-photo');