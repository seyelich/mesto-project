import '../pages/index.css';
import { initialCards, popups, popupAdd, popupEdit, editButton, addButton, formAdd, formEdit, obj } from './constants';
import { handleCardFormSubmit, handleProfileFormSubmit, writeInfoInInput } from './modal';
import { addCard } from './card';
import { enableValidation } from './validate';
import { closePopup, openPopup } from './utils';

addButton.addEventListener('click', () => { openPopup(popupAdd) });

popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) { 
        closePopup(popup);
      };

      if (evt.target.classList.contains('popup__button-close')) { 
        closePopup(popup);
      }
  });
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  writeInfoInInput();
});

formEdit.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleCardFormSubmit);
initialCards.forEach((i) => { addCard(i.name, i.link) });

writeInfoInInput();
enableValidation(obj);