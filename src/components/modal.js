import { closePopup } from "./utils";
import { toggleButtonState } from './validate';
import { name, about, inputAbout, inputName, popupAdd, popupEdit, obj, popupAddBtnSave, popupAddInputs, popupAva, inputAva, profilePic } from './constants';

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  about.textContent = inputAbout.value;
  closePopup(popupEdit);
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAdd);
  toggleButtonState(popupAddInputs, popupAddBtnSave, obj);
}

export function handleAvaFormSubmit(evt) {
  evt.preventDefault();
  profilePic.src = inputAva.value;
  closePopup(popupAva);
}

// export function handleCheckFormSubmit(evt) {
//   evt.preventDefault();
//   closePopup(popupCheck);
// }

export function writeInfoInInput() {
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;
}
