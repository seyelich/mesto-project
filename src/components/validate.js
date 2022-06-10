export const obj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  fieldsetSelector: '.form__input-container',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
  if(errorElement.clientHeight / 15 >= 3) {
    errorElement.classList.add('form__input-error_size_l')
  }
};

export const hideInputError = (formElement, inputElement, obj) => {
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

const toggleButtonState = (inputList, buttonEl, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(obj.inactiveButtonClass);
  } 
  else {
    buttonEl.classList.remove(obj.inactiveButtonClass);
  }
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonEl = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonEl, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonEl, obj);
    });

    inputElement.addEventListener('keydown', function (evt) {
      if(evt.key === 'Enter') {
        checkInputValidity(formElement, inputElement);
        if(hasInvalidInput(inputList)) {
          evt.preventDefault();
        }
      };
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