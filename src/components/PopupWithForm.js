import { Popup } from './Popup';
import { formEditSubmitHandler, formAddSubmitHandler, formAvaSubmitHandler } from './modal';
import { obj } from "./constants";

class PopupWithForm extends Popup {
  constructor(popupSelector, callbackFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.form');
    this._callbackFormSubmit = callbackFormSubmit;
    this._inputList = this._formElement.querySelectorAll(obj.inputSelector);
  }

  open() {
    super.open();
    // this.setEventListener();
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  } 

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._callbackFormSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
    this._inputList.forEach(input => {
      input.classList.remove(obj.inputErrorClass);
      this._formElement.querySelector(`.${input.name}-error`).classList.remove(obj.errorClass);
    })
  }
}

const popupEditCopy = new PopupWithForm('.popup-edit', formEditSubmitHandler);
const popupAddCopy = new PopupWithForm('.popup-add', formAddSubmitHandler);
const popupAvaCopy = new PopupWithForm('.popup-avatar', formAvaSubmitHandler);

export { popupEditCopy, popupAddCopy, popupAvaCopy };