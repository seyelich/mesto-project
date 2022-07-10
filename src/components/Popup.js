export class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open () {
    this._popupElement.classList.add('popup_opened');
  }

  close () {
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this._popupElement);
    }
  }

  setEventListeners () {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this._popupElement);
      };
    });
  }
}