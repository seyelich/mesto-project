export class FormValidator {
  constructor (param, form) {
    this._form = form;
    this._submitBtn = form.querySelector(param.submitButtonSelector);
    this._submitBtnInactiveClass = param.inactiveButtonClass;
    this._inputErrorClass = param.inputErrorClass;
    this._errorMsgClass = param.errorClass;
  }

  _setListeners () {
    this._form.addEventListener('input', this._validateForm.bind(this));
  }

  _validateForm (evt) {
    const msgSpan = this._form.querySelector(`.${evt.target.name}-error`);
    this._validateInput(evt.target, msgSpan);
    this._toggleSubmitBtn();
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

  _toggleSubmitBtn () {
    if (!this._form.checkValidity()) {
      this._submitBtn.classList.add(this._submitBtnInactiveClass);
      this._submitBtn.setAttribute('disabled', '');
    } else {
      this._submitBtn.classList.remove(this._submitBtnInactiveClass);
      this._submitBtn.removeAttribute('disabled');
    }
  }

  enableValidation () {
    this._form.setAttribute('novalidate', '');
    this._toggleSubmitBtn();
    this._setListeners();
  }
}
