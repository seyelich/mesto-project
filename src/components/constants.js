export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const obj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  fieldsetSelector: '.form__input-container',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
export const popupPhoto = document.querySelector('.popup-photo');
export const cardsContainer = document.querySelector('.cards');
export const popupPhotoImg = popupPhoto.querySelector('.popup-photo__img');
export const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popups = document.querySelectorAll('.popup');
export const editButton = document.querySelector('.profile__button_type_edit');
export const addButton = document.querySelector('.profile__button_type_add');
export const popupAddInputs = Array.from(popupAdd.querySelectorAll(obj.inputSelector));
export const popupAddBtnSave = popupAdd.querySelector('.form__button-save')
export const name = document.querySelector('.profile__name');
export const about = document.querySelector('.profile__description');
export const inputName = popupEdit.querySelector('#name');
export const inputAbout = popupEdit.querySelector('#about');
export const formAdd = popupAdd.querySelector('.form');
export const formEdit = popupEdit.querySelector('.form');
export const cardName = popupAdd.querySelector('#title');
export const cardLink = popupAdd.querySelector('#link');
