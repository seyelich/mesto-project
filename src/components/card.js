import { myId } from ".";
import { api } from "./Api";

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
    
    this._isOwned = this._ownerId === myId;
    this._isLiked = this._likes.some((like) => like._id === myId);

    this._likeButtonListener = this._likeButtonListener.bind(this);
    this._deleteButtonListener = this._deleteButtonListener.bind(this);
    this._imageListener = this._imageListener.bind(this);
  }
  
  _initLayout () {
    this._image.src = this._src;
    this._image.alt = this._title;
    this._titleElem.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    if (!this._isOwned) this._deleteButton.remove();
    if (this._isLiked) this._likeButton.classList.add('card__like-button_active');
  }
  
  _likeButtonListener () {
    if (this._isLiked) {
      api.deleteLike(this._id)
        .then(res => api.checkResult(res))
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

  _imageListener () {
    this._clickHandler(this._src, this._title);
  }

  _setListeners () {
    this._image.addEventListener('click', this._imageListener);
    this._likeButton.addEventListener('click', this._likeButtonListener);
    if (this._isOwned) this._deleteButton.addEventListener('click', this._deleteButtonListener);
  }

  get element () {
    this._initLayout();
    this._setListeners();

    return this._element;
  }
}

