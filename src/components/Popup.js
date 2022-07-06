class Popup {
  constructor (popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open () {
    this.popup.classList.add('popup_opened');
  }

  close () {
    this.popup.classList.remove('popup_opened');
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this.popup);
    }
  }

  setEventListeners () {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this.popup);
      };
    });
  }
}

export { Popup };