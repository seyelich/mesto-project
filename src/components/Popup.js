export class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  open () {
    this._setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close () {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('mousedown', this._handleMouseDown);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this._popupElement);
    }
  }

  _handleMouseDown (evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
      this.close(this._popupElement);
    }
  }

  _setEventListeners () {
    this._popupElement.addEventListener('mousedown', this._handleMouseDown);
    document.addEventListener('keydown', this._handleEscClose);
  }
}