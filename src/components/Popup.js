export class Popup {
  constructor (popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open () {
    this.popupElement.classList.add('popup_opened');
  }

  close () {
    this.popupElement.classList.remove('popup_opened');
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close(this.popupElement);
    }
  }

  setEventListeners () {
    this.popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this.popupElement);
      };
    });

    
  }
}