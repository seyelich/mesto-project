class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector;
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this._popup);
    }
  }

  setEventListeners () {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this._popup);
      };
    });
  }
}

export { Popup };