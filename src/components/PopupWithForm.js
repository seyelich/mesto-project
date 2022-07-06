import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this.formElement = this.popup.querySelector('.form');
    this.callbackFormSubmit = callbackFormSubmit;
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._formElement.querySelectorAll('.form__input');
  
    // создаём пустой объект
    this._formValues = {};
  
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    // возвращаем объект значений
    return this._formValues;
  } 

  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this.popup);
      };
    });

    this.formElement.addEventListener('submit', this.callbackFormSubmit);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    this.formElement.reset();
  }
}