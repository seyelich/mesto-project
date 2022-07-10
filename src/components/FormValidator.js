import { obj } from './constants';

export class FormValidator {
  constructor (param, form) {
    this._form = form;
    this._submitBtn = form.querySelector(param.submitButtonSelector);
    this._submitBtnInactiveClass = param.inactiveButtonClass;
    this._inputErrorClass = param.inputErrorClass;
    this._errorMsgClass = param.errorClass;
  }

  static _inputErrorClass = obj.inputErrorClass; //зачем это делать, если у нас param = obj при создании класса?
  static _errorMsgClass = obj.errorClass;

  _setListeners () {
    this._form.addEventListener('input', this._validateForm.bind(this));
  }

  _validateForm (evt) {
    const msgSpan = this._form.querySelector(`.${evt.target.name}-error`);
    this._validateInput(evt.target, msgSpan);
    FormValidator.toggleSubmitBtn(this._form, this._submitBtn, this._submitBtnInactiveClass); //FormValidator -> this?
  }

  _validateInput (input, msgSpan) {
    msgSpan.textContent = input.validationMessage;
    if (input.validity.valid) {
      input.classList.remove(this._inputErrorClass);
      msgSpan.classList.remove(this._errorMsgClass);
    } else {
      input.classList.add(this._inputErrorClass);
      msgSpan.classList.add(this._errorMsgClass);
    }
  }

  // static resetValidation (form) {
  //   for (const element of form.children) {
  //     element.classList.remove(FormValidator._inputErrorClass);
  //     element.classList.remove(FormValidator._errorMsgClass);
  //   }
  // }

  static toggleSubmitBtn (form, button, inactiveClass) {
    if (!form.checkValidity()) {
      button.classList.add(inactiveClass);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(inactiveClass);
      button.removeAttribute('disabled');
    }
  }

  enableValidation () {
    this._form.setAttribute('novalidate', '');
    FormValidator.toggleSubmitBtn(this._form, this._submitBtn, this._submitBtnInactiveClass);
    this._setListeners();
  }
}
