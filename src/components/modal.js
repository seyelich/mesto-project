import { profileName, profileAbout, inputAbout, inputName } from './constants';

export function writeInfoInInput() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
