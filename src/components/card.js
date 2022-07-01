import { openPopup } from "./utils";
import { popupPhoto, cardsContainer, popupPhotoImg, popupPhotoTitle, cardLink, cardName } from "./constants";
import { deleteCard, deleteLike, setLike,checkResult } from "./api";

export class Card {
  constructor (cardNameValue, cardLinkValue, cardLikes, userId, cardId, template) {
    this._title = cardNameValue;
    this._src = cardLinkValue;
    this._likes = cardLikes;
    this._id = cardId;
    this._ownerId = userId;
    this._template = template;

    // Темплат пока не передаётся в объект, поэтому делаем поиск элемента по-старинке
    this._element = document.querySelector('#card-template').cloneNode.firstElementChild;
    this._image = this._element.querySelector('.cardImg');
    this._titleElem = this._element.querySelector('card__title');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    
    this._isOwned = this._ownerId === '345b79856fbd9fc381d12a7d'; // WTF?
  }
  
  _initLayout () {
    this._image.src = this._scr;
    this._image.alt = this._title;
    this._titleElem.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
  }

  create () {
    this._initLayout();
  }
}


export function createCard(cardNameValue, cardLinkValue, cardLikes, userId, cardId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardEl.querySelector('.card__img');
  const cardTitle = cardEl.querySelector('.card__title');
  const cardDeleteButton = cardEl.querySelector('.card__delete-button');
  const cardLikeButton = cardEl.querySelector('.card__like-button');
  const cardLikeCounter = cardEl.querySelector('.card__like-counter');
  cardImg.src = cardLinkValue;
  cardImg.alt = cardNameValue;
  cardTitle.textContent = cardNameValue;
  cardLikeCounter.textContent = cardLikes.length;
  cardEl.id = cardId;
  if(userId !== '345b79856fbd9fc381d12a7d') {
    cardDeleteButton.remove();
  }
  cardDeleteButton.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');
    deleteCard(card.id)
      .then(res => {
        checkResult(res);
        card.remove()
      })
      .catch(err => 
        console.log(err)
    );
  });

  cardLikeButton.addEventListener('click', function(evt) {
    const card = evt.target.closest('.card');
    if(cardLikeButton.classList.contains('card__like-button_active')) {
      deleteLike(card.id)
        .then(res => checkResult(res))
        .then((data) => {
          cardLikeCounter.textContent = data.likes.length;
          cardLikeButton.classList.remove('card__like-button_active');
        })
        .catch(err => 
          console.log(err)
      );
    }
    else { 
      setLike(card.id)
        .then((res) => checkResult(res))
        .then((data) => {
          cardLikeCounter.textContent = data.likes.length;
          cardLikeButton.classList.add('card__like-button_active');
        })
        .catch(err => 
          console.log(err)
      );
    }
  });

  if (cardLikes.some((like) => like._id === '345b79856fbd9fc381d12a7d')) {
    cardLikeButton.classList.add('card__like-button_active');
  }

  function setPopupPhoto() {
    openPopup(popupPhoto);
    popupPhotoImg.src = cardLinkValue;
    popupPhotoImg.alt = cardNameValue;
    popupPhotoTitle.textContent = cardNameValue;
  }
  cardImg.addEventListener('click', setPopupPhoto);
  
  return cardEl;
}

export function addCard(cardNameValue, cardLinkValue, cardLikes, userId, cardId) {
  const cardEl = createCard(cardNameValue, cardLinkValue, cardLikes, userId, cardId);
  cardsContainer.prepend(cardEl);
}
