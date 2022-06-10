import { addCard } from "./card";
import { closePopup } from "./utils";

export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const name = document.querySelector('.profile__name');
export const about = document.querySelector('.profile__description');
export const inputName = popupEdit.querySelector('#name');
export const inputAbout = popupEdit.querySelector('#about');
export const formAdd = popupAdd.querySelector('.form');
export const formEdit = popupEdit.querySelector('.form');
const cardName = popupAdd.querySelector('#title');
const cardLink = popupAdd.querySelector('#link');

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
}

export function writeInfoInInput() {
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;
}
