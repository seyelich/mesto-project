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
export const popupCheck = document.querySelector('.popup-check');
export const popupAva = document.querySelector('.popup-avatar')
export const popups = document.querySelectorAll('.popup');
export const editButton = document.querySelector('.profile__button_type_edit');
export const addButton = document.querySelector('.profile__button_type_add');
export const editAvaOverlay = document.querySelector('.profile__img-overlay');
export const popupAddInputs = Array.from(popupAdd.querySelectorAll(obj.inputSelector));
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__description');
export const inputName = popupEdit.querySelector('#name');
export const inputAbout = popupEdit.querySelector('#about');
export const formAdd = popupAdd.querySelector('.form');
export const formEdit = popupEdit.querySelector('.form');
// export const formCheck = popupCheck.querySelector('.form');
export const formAva = popupAva.querySelector('.form');
export const cardName = popupAdd.querySelector('#title');
export const cardLink = popupAdd.querySelector('#link');
export const profilePic = document.querySelector('.profile__img');
export const inputAva = popupAva.querySelector('#avatar');
