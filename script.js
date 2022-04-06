const popupEdit = document.querySelector('.popup-edit');
const editButton = document.querySelector('.profile__button_type_edit');
const closeButton1 = document.querySelectorAll('.popup__button-close')[0];
const closeButton2 = document.querySelectorAll('.popup__button-close')[1];
const closeButton3 = document.querySelectorAll('.popup__button-close')[2]
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__button_type_add');
const popup = document.querySelector('.popup');
const cardsContainer = document.querySelector('.cards');
const popupPhoto = document.querySelector('.popup-photo');

editButton.addEventListener('click', function() {
  popupEdit.classList.add('popup_opened');

  const name = document.querySelector('.profile__name');
  const about = document.querySelector('.profile__description');
  const inputName = document.querySelector('#name');
  const inputAbout = document.querySelector('#about');
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;

  const formElement1 = document.querySelectorAll('.form')[0];
  function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;

    popupEditClose();
  }
  formElement1.addEventListener('submit', formSubmitHandler);
});

addButton.addEventListener('click', function() {
  popupAdd.classList.add('popup_opened');
});

function popupEditClose() {
  popupEdit.classList.remove('popup_opened'); //optimize code
}

function popupAddClose() {
  popupAdd.classList.remove('popup_opened');
}

function popupPhotoClose() {
  popupPhoto.classList.remove('popup_opened');
}

closeButton1.addEventListener('click', popupEditClose);
closeButton2.addEventListener('click', popupAddClose);
closeButton3.addEventListener('click', popupPhotoClose);

function addCard(cardNameValue, cardLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  cardEl.querySelector('.card__img').src = cardLinkValue;
  cardEl.querySelector('.card__img').alt = cardNameValue;
  cardEl.querySelector('.card__title').textContent = cardNameValue;

  cardEl.querySelector('.card__delete-button').addEventListener('click', function() {
    cardEl.remove();
  });

  cardEl.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardEl.querySelector('.card__img').addEventListener('click', function() {
    popupPhoto.classList.add('popup_opened');
    popupPhoto.querySelector('.popup-photo__img').src = cardLinkValue;
    popupPhoto.querySelector('.popup-photo__img').alt = cardNameValue;
    popupPhoto.querySelector('.popup-photo__title').textContent = cardNameValue;
  });

  cardsContainer.prepend(cardEl);
}

const formElement2 = document.querySelectorAll('.form')[1];

function formSaveHandler (evt) {
  evt.preventDefault();

  const cardName = document.querySelector('#title');
  const cardLink = document.querySelector('#link');

  addCard(cardName.value, cardLink.value);
  popupAddClose();

  cardName.value = '';
  cardLink.value = '';
}

formElement2.addEventListener('submit', formSaveHandler);

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

for (let i  = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}
