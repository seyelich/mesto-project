import '../pages/index.css';
import { cardName, cardLink, popups, popupAdd, popupEdit, editButton, addButton, formAdd, formEdit, obj, editAvaOverlay, popupAva, name, about, profilePic, formAva } from './constants';
import { handleAvaFormSubmit, handleCardFormSubmit, handleProfileFormSubmit, writeInfoInInput } from './modal';
import { addCard } from './card';
import { enableValidation } from './validate';
import { closePopup, openPopup, checkResult } from './utils';
import { getProfileInfo, getCards, changeProfile, postNewCard, changeAva } from './api';

addButton.addEventListener('click', () => { openPopup(popupAdd) });

popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) { 
        closePopup(popup);
      };

      if (evt.target.classList.contains('popup__button-close')) { 
        closePopup(popup);
      }
  });
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  writeInfoInInput();
});

editAvaOverlay.addEventListener('click', () => {
  openPopup(popupAva)
})

formEdit.addEventListener('submit', function(evt) {
  handleProfileFormSubmit(evt);
  const btn = formEdit.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { name, about } = evt.currentTarget.elements;
  changeProfile({
    name: name.value,
    about: about.value
  })
    .then(res => checkResult(res))
    .catch(err => console.log(err))
    .finally(res=> {
      btn.textContent = 'Сохранить'
  });
});

formAdd.addEventListener('submit', function(evt) {
  handleCardFormSubmit(evt);
  const btn = formAdd.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { title, link } = evt.currentTarget.elements;
  postNewCard({
    name: title.value,
    link: link.value
  })
    .then(res => checkResult(res))
    .then(data => { addCard(data.name, data.link, data.likes, data.owner._id, data._id) })
    .catch(err => console.log(err))
    .finally(res => {
      btn.textContent = 'Создать'
  });
  formAdd.reset();
});

// formCheck.addEventListener('submit', function(evt) {
//   handleCheckFormSubmit(evt);
// })

enableValidation(obj);

getProfileInfo()
  .then(res => checkResult(res))
  .then(data => renderProfile(data))
  .catch(err => 
    console.log(err)
);

function renderProfile(data) {
  name.textContent = data.name;
  about.textContent = data.about;
  profilePic.src = data.avatar;
}

getCards()
  .then(res => checkResult(res))
  .then(data => renderCards(data))
  .catch(err => 
    console.log(err)
);

function renderCards(data) {
  data.forEach((i) => {
    addCard(i.name, i.link, i.likes, i.owner._id, i._id);
  });
}

formAva.addEventListener('submit', function(evt) {
  handleAvaFormSubmit(evt);
  const btn = formAva.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { avatar } = evt.currentTarget.elements;
  changeAva({avatar: avatar.value})
    .then(res => checkResult(res))
    .catch(err => console.log(err))
    .finally(res => {
      btn.textContent = 'Сохранить'
  });
})
