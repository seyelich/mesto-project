import '../pages/index.css';
import { popups, popupAdd, popupEdit, editButton, addButton, formAdd, formEdit, obj, editAvaOverlay, popupAva, name, about, profilePic, formAva, inputName, inputAbout, popupAddInputs, inputAva, formCheck, profileName, profileAbout } from './constants';
import { writeInfoInInput } from './modal';
import { addCard } from './card';
import { enableValidation, toggleButtonState } from './validate';
import { closePopup, openPopup } from './utils';
import { getProfileInfo, getCards, changeProfile, postNewCard, changeAva, checkResult } from './api';

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
  evt.preventDefault();
  const btn = formEdit.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { name, about } = evt.currentTarget.elements;
  changeProfile({
    name: name.value,
    about: about.value
  })
    .then(res => {
      checkResult(res);
      profileName.textContent = inputName.value;
      profileAbout.textContent = inputAbout.value;
      closePopup(popupEdit);
    })
    .catch(err => console.log(err))
    .finally(res=> {
      btn.textContent = 'Сохранить'
  });
});

formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const btn = formAdd.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { title, link } = evt.currentTarget.elements;
  postNewCard({
    name: title.value,
    link: link.value
  })
    .then(res => checkResult(res))
    .then(data => {
      addCard(data.name, data.link, data.likes, data.owner._id, data._id);
      closePopup(popupAdd);
      toggleButtonState(popupAddInputs, btn, obj);
    })
    .catch(err => console.log(err))
    .finally(res => {
      btn.textContent = 'Создать'
  });
  formAdd.reset();
});

enableValidation(obj);

Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cards]) => {
    renderProfile(userData);
    renderCards(cards);
  })
  .catch(err => {
    console.log(err)
});

function renderProfile(data) {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profilePic.src = data.avatar;
}

function renderCards(data) {
  data.reverse().forEach((i) => {
    addCard(i.name, i.link, i.likes, i.owner._id, i._id);
  });
}

formAva.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const btn = formAva.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { avatar } = evt.currentTarget.elements;
  changeAva({avatar: avatar.value})
    .then(res => {
      checkResult(res);
      profilePic.src = inputAva.value;
      closePopup(popupAva);
    })
    .catch(err => console.log(err))
    .finally(res => {
      btn.textContent = 'Сохранить'
  });
})

// formCheck.addEventListener('submit', function(evt) {
//   evt.preventDefault();
//   const btn = formAva.querySelector('.form__button-save');
//   const card = evt.
// })