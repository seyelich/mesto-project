const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const closeButtons = document.querySelectorAll('.popup__button-close');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const cardsContainer = document.querySelector('.cards');
const formAdd = popupAdd.querySelector('.form');
const formEdit = popupEdit.querySelector('.form');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__description');
const inputName = popupEdit.querySelector('#name');
const inputAbout = popupEdit.querySelector('#about');
const cardName = popupAdd.querySelector('#title');
const cardLink = popupAdd.querySelector('#link');
const popupPhotoImg = popupPhoto.querySelector('.popup-photo__img');
const popupPhotoTitle = popupPhoto.querySelector('.popup-photo__title');

const initialCards = [
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

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => openPopup(popupAdd));

closeButtons.forEach((closeButton) => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  name.textContent = inputName.value;
  about.textContent = inputAbout.value;
  closePopup(popupEdit);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);

function createCard(cardNameValue, cardLinkValue) {
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

function addCard(cardNameValue, cardLinkValue) {
  const cardEl = createCard(cardNameValue, cardLinkValue);
  cardsContainer.prepend(cardEl);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addCard(cardName.value, cardLink.value);
  formAdd.reset();
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach((i) => { addCard(i.name, i.link) });
