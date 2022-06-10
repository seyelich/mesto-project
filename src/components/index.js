import '../pages/index.css';
import { handleCardFormSubmit, handleProfileFormSubmit, popupAdd, popupEdit, formAdd, formEdit, writeInfoInInput } from './modal';
import { initialCards, addCard } from './card';
import { obj, enableValidation } from './validate';
import { closePopup, openPopup } from './utils';

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('profile__button_type_add')) {
    openPopup(popupAdd);
  }
});

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup__button-close')) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  }
});

document.addEventListener('mousedown', (evt) => {
  const popup = evt.target.closest('.popup');
  const popupContainer = evt.target.closest('.popup__container');
  const popupPhotoContainer = evt.target.closest('.popup-photo__container');
  if (popup && !popupContainer && !popupPhotoContainer) {
    closePopup(popup);
  }
})

document.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('profile__button_type_edit')) {
    openPopup(popupEdit);
    writeInfoInInput();
  }
});

formEdit.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleCardFormSubmit);
initialCards.forEach((i) => { addCard(i.name, i.link) });

writeInfoInInput();
enableValidation(obj);