import { openPopup } from "./utils";
import { popupPhoto, cardsContainer, popupPhotoImg, popupPhotoTitle } from "./constants";
import { deleteCard, deleteLike, setLike,checkResult } from "./api";

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
