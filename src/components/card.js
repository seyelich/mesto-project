import { openPopup } from "./utils";
import { popupPhoto, cardsContainer, popupPhotoImg, popupPhotoTitle } from "./constants";

function toggleLikeButton(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

export function createCard(cardNameValue, cardLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');
  const cardTitle = cardEl.querySelector('.card__title');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');
  const cardLikeButton = cardEl.querySelector('.card__like-button');
  cardImg.src = cardLinkValue;
  cardImg.alt = cardNameValue;
  cardTitle.textContent = cardNameValue;
  
  cardDeleteButton.addEventListener('click', () => { cardEl.remove() });
  cardLikeButton.addEventListener('click', toggleLikeButton);
  function setPopupPhoto() {
    openPopup(popupPhoto);
    popupPhotoImg.src = cardLinkValue;
    popupPhotoImg.alt = cardNameValue;
    popupPhotoTitle.textContent = cardNameValue;
  }
  cardImg.addEventListener('click', setPopupPhoto);
  
  return cardEl;
}

export function addCard(cardNameValue, cardLinkValue) {
  const cardEl = createCard(cardNameValue, cardLinkValue);
  cardsContainer.prepend(cardEl);
}
