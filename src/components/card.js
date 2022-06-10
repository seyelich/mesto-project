import { openPopup } from "./utils";

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popupPhoto = document.querySelector('.popup-photo');
const cardsContainer = document.querySelector('.cards');
const popupPhotoImg = popupPhoto.querySelector('.popup-photo__img');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');

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

  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardImg.addEventListener('click', () => {
    openPopup(popupPhoto);
    popupPhotoImg.src = cardLinkValue;
    popupPhotoImg.alt = cardNameValue;
    popupPhotoTitle.textContent = cardNameValue;
  });

  return cardEl;
}

export function addCard(cardNameValue, cardLinkValue) {
  const cardEl = createCard(cardNameValue, cardLinkValue);
  cardsContainer.prepend(cardEl);
}
