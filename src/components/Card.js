import { myId } from ".";

export class Card {
  constructor (data, template, handleCardClick, handleLike, handleDelete) {
    this._title = data.name;
    this._src = data.link;
    this._likes = data.likes;
    this.id = data._id;
    this._ownerId = data.owner._id;
    this._template = template;
    this._clickHandler = handleCardClick;
    this._likeHandler = handleLike;
    this._deleteHandler = handleDelete;

    this._element = this._template.content.cloneNode(true).firstElementChild;
    this._image = this._element.querySelector('.card__img');
    this._titleElem = this._element.querySelector('.card__title');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    
    this._isOwned = this._ownerId === myId;

    this._imageListener = this._imageListener.bind(this);
  }
  
  _initLayout () {
    this._image.src = this._src;
    this._image.alt = this._title;
    this._titleElem.textContent = this._title;
    this._likeCounter.textContent = this._likes.length;
    if (!this._isOwned) this._deleteButton.remove();
    if (this.isLiked) this._likeButton.classList.add('card__like-button_active');
  }

  processLikes (likes) {
    this._likes = [...likes];
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }
  
  delete () {
    this._element.remove();
  }

  _imageListener () {
    this._clickHandler(this._src, this._title);
  }

  _setListeners () {
    this._image.addEventListener('click', this._imageListener);
    this._likeButton.addEventListener('click', this._likeHandler);
    if (this._isOwned) this._deleteButton.addEventListener('click', this._deleteHandler);
  }

  get isLiked () {
    return this._likes.some((like) => like._id === myId);
  }

  get element () {
    this._initLayout();
    this._setListeners();

    return this._element;
  }
}

