import { openPopup } from "./utils";
import { popupPhoto, cardsContainer, popupPhotoImg, popupPhotoTitle } from "./constants";
import { api } from "./api";
import Section from "./Section";
import { popupPhotoCopy } from './PopupWithImage.js';

export class Card {
  constructor (data, template, handleCardClick) {
    this._title = data.name;
    this._src = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._template = template;
    this._clickHandler = handleCardClick;

    this._element = this._template.content.cloneNode(true).firstElementChild;
    this._image = this._element.querySelector('.card__img');
    this._titleElem = this._element.querySelector('.card__title');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    
    this._isOwned = this._ownerId === '345b79856fbd9fc381d12a7d'; // САВ WTF?
    this._isLiked = this._likes.some((like) => like._id === '345b79856fbd9fc381d12a7d');
  }
  
  _initLayout () {
    this._image.src = this._src;
    this._image.alt = this._title;
    this._titleElem.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    if (!this._isOwned) this._deleteButton.remove();
    if (this._isLiked) this._likeButton.classList.add('card__like-button_active');
  }
  
  // САВ Возможно, стоит подумать над полным рефакторингом этого метода
  _likeButtonListener () {
    if (this._isLiked) {
      api.deleteLike(this._id)
        .then(res => api.checkResult(res)) // САВ Я бы проверял ответ сервака в апи, а не в обработчике события
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.remove('card__like-button_active');
          this._isLiked = false;
        })
        .catch(err => 
          console.log(`Ошибка лайка карточки: ${err}`)
      );
    }
    else { 
      api.setLike(this._id)
        .then((res) => api.checkResult(res))
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.add('card__like-button_active');
          this._isLiked = true;
        })
        .catch(err => 
          console.log(`Ошибка лайка карточки: ${err}`)
      );
    }
  }

  _deleteButtonListener () {
    api.deleteCard(this._id)
      .then(res => {
        api.checkResult(res);
        this._element.remove()
      })
      .catch(err => 
        console.log(`Ошибка удаления карточки: ${err}`)
    );
  }
 
  // САВ Пока плейсхолдер, потому что я не знаю, как там будут работать попапы
  _imageListener () {
    console.log(this);
    this._clickHandler.bind(popupPhotoCopy)(this._src, this._title);
  }
  
  // САВ Надо обсудить использование бинда, будет ли это проблемой
  _setListeners () {
    this._image.addEventListener('click', this._imageListener.bind(this));
    this._likeButton.addEventListener('click', this._likeButtonListener.bind(this));
    if (this._isOwned) this._deleteButton.addEventListener('click', this._deleteButtonListener.bind(this));
  }

  // САВ Возможно, нужно сделать метод, а не геттер, но геттер вроде логичнее
  get element () {
    this._initLayout();
    this._setListeners();

    return this._element;
  }
}

/*
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
*/

// САВ Эту функцию надо будет реализовать в другом классе или в индекс.жс
function setPopupPhoto(src, title) {
  openPopup(popupPhoto);
  popupPhotoImg.src = src;
  popupPhotoImg.alt = title;
  popupPhotoTitle.textContent = title;
}

export function addCard(cardNameValue, cardLinkValue, cardLikes, userId, cardId, template) {
  const card = new Card(cardNameValue, cardLinkValue, cardLikes, userId, cardId, template, setPopupPhoto);
  const cardEl = card.element;
  cardsContainer.prepend(cardEl);
}
