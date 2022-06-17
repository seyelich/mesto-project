import { profileName, profileAbout, inputAbout, inputName } from './constants';

// export function handleCheckFormSubmit(evt) {
//   evt.preventDefault();
//   closePopup(popupCheck);
// }

export function writeInfoInInput() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
