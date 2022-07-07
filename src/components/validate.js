import { obj } from "./constants";

export class FormValidator {
  constructor (param, form) {
    this._form = form;
    this._submitBtn = form.querySelector(param.submitButtonSelector);
    this._submitBtnInactiveClass = param.inactiveButtonClass;
    this._inputErrorClass = param.inputErrorClass;
    this._errorMsgClass = param.errorClass;
  }

  _setListeners () {
    this._form.addEventListener('input', this._validateForm.bind(this))
  }

  _validateForm (evt) {
    const msgSpan = this._form.querySelector(`.${evt.target.name}-error`);
    this._validateInput(evt.target, msgSpan);
    FormValidator.toggleSubmitBtn(this._form, this._submitBtn, this._submitBtnInactiveClass);
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

  static toggleSubmitBtn (form, button, inactiveClass) {
    console.log(form.checkValidity());
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
    this._setListeners();
  }
}
/*
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

export function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}

export function toggleButtonState(inputList, buttonEl, obj) {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(obj.inactiveButtonClass);
    buttonEl.setAttribute('disabled', true);
  } 
  else {
    buttonEl.classList.remove(obj.inactiveButtonClass);
    buttonEl.removeAttribute('disabled');
  }
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonEl = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonEl, obj);
    });
  });
};

export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(obj.fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, obj);
    });
  });
};
*/