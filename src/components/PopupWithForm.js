import { Popup } from './Popup';
import { formEditSubmitHandler, formAddSubmitHandler, formAvaSubmitHandler } from './modal';

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this._formElement = this.popupElement.querySelector('.form');
    this._callbackFormSubmit = callbackFormSubmit;
  }

  open() {
    super.open();
    this.setEventListeners();
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
    super.setEventListeners();
    this.formElement.addEventListener('submit', this._callbackFormSubmit);
  }

  close() {
    this.popupElement.classList.remove('popup_opened');
    this.formElement.reset();
  }
}

const popupEditCopy = new PopupWithForm('.popup-edit', formEditSubmitHandler);
const popupAddCopy = new PopupWithForm('.popup-add', formAddSubmitHandler);
const popupAvaCopy = new PopupWithForm('.popup-avatar', formAvaSubmitHandler);

export { popupEditCopy, popupAddCopy, popupAvaCopy };