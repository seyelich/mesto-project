const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const closeButtons = document.querySelectorAll('.popup__button-close');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const cardsContainer = document.querySelector('.cards');
const formAdd = popupAdd.querySelector('.form');

function popupOpened(popupType) {
  popupType.classList.add('popup_opened');
}

function popupClose(popupType) {
  popupType.classList.remove('popup_opened');
}

addButton.addEventListener('click', () => popupOpened(popupAdd));

closeButtons.forEach((closeButton) => {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => popupClose(popup));
});

editButton.addEventListener('click', () => {
  popupOpened(popupEdit);

  const name = document.querySelector('.profile__name');
  const about = document.querySelector('.profile__description');
  const inputName = popupEdit.querySelector('#name');
  const inputAbout = popupEdit.querySelector('#about');
  inputName.value = name.textContent;
  inputAbout.value = about.textContent;

  const formEdit = popupEdit.querySelector('.form');
  function formSubmitHandler (evt) {
    evt.preventDefault();

    name.textContent = inputName.value;
    about.textContent = inputAbout.value;

    popupClose(popupEdit);
  }
  
  formEdit.addEventListener('submit', formSubmitHandler);
});

function addCard(cardNameValue, cardLinkValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardEl = cardTemplate.querySelector('.card').cloneNode(true);
  cardEl.querySelector('.card__img').src = cardLinkValue;
  cardEl.querySelector('.card__img').alt = cardNameValue;
  cardEl.querySelector('.card__title').textContent = cardNameValue;

  cardEl.querySelector('.card__delete-button').addEventListener('click', () => { cardEl.remove() });

  cardEl.querySelector('.card__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardEl.querySelector('.card__img').addEventListener('click', () => {
    popupOpened(popupPhoto);
    popupPhoto.querySelector('.popup-photo__img').src = cardLinkValue;
    popupPhoto.querySelector('.popup-photo__img').alt = cardNameValue;
    popupPhoto.querySelector('.popup-photo__title').textContent = cardNameValue;
  });

  cardsContainer.prepend(cardEl);
}

function formSaveHandler (evt) {
  evt.preventDefault();

  const cardName = popupAdd.querySelector('#title');
  const cardLink = popupAdd.querySelector('#link');

  addCard(cardName.value, cardLink.value);

  cardName.value = '';
  cardLink.value = '';

  popupClose(popupAdd);
}

formAdd.addEventListener('submit', formSaveHandler);

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
