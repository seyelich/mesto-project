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
export const popupPhotoImg = popupPhoto.querySelector('.popup-photo__img');
export const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupAva = document.querySelector('.popup-avatar')
export const formEdit = document.querySelector('.form-edit');
export const formAdd = document.querySelector('.form-place');
export const formAva = document.querySelector('.form-avatar');
export const editButton = document.querySelector('.profile__button_type_edit');
export const addButton = document.querySelector('.profile__button_type_add');
export const editAvaOverlay = document.querySelector('.profile__img-overlay');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__description');
export const inputName = popupEdit.querySelector('#name');
export const inputAbout = popupEdit.querySelector('#about');
export const profilePic = document.querySelector('.profile__img');
export const inputAva = popupAva.querySelector('#avatar');
export const formEditSaveBtn = formEdit.querySelector('.form__button-save');
export const cardTemplate = document.querySelector('#card-template');