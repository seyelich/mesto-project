import { addCard } from "./card";
import { closePopup } from "./utils";
import { toggleButtonState } from './validate';
import { name, about, inputAbout, inputName, popupAdd, popupEdit, formAdd, cardName, cardLink, obj, popupAddBtnSave, popupAddInputs } from './constants';

export function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  about.textContent = inputAbout.value;
  closePopup(popupEdit);
}

export function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  closePopup(popupAdd);
  formAdd.reset();
  toggleButtonState(popupAddInputs, popupAddBtnSave, obj);
}

export function writeInfoInInput() {
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;
}
