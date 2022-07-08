import { Popup } from './Popup';

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this.formElement = this.popupElement.querySelector('.form');
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
    this.popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) { 
        this.close(this.popupElement);
      };
    });

    this.formElement.addEventListener('submit', this.callbackFormSubmit);
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    this.formElement.reset();
  }
}

const popupEditCopy = new PopupWithForm('.popup-edit');
const popupAddCopy = new PopupWithForm('.popup-add');
const popupAvaCopy = new PopupWithForm('.popup-avatar');

export { popupEditCopy, popupAddCopy, popupAvaCopy };