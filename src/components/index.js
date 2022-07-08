import '../pages/index.css';
import { formEditSaveBtn, popups, popupAdd, popupEdit, editButton, addButton, formAdd, formEdit, obj, editAvaOverlay, popupAva, name, about, profilePic, formAva, inputName, inputAbout, popupAddInputs, inputAva, formCheck, profileName, profileAbout, cardTemplate } from './constants';
import { writeInfoInInput } from './modal';
import { Card, addCard } from './card';
import { FormValidator } from './validate';
import { api } from './api';
import { popupEditCopy, popupAddCopy, popupAvaCopy } from './PopupWithForm';
import { popupPhotoCopy } from './PopupWithImage';
import {userInfo} from './UserInfo'
import Section from './Section';

let cardList;

addButton.addEventListener('click', () => {
  popupAddCopy.open();
  popupAddCopy.setEventListeners();
});

editButton.addEventListener('click', () => {
  popupEditCopy.open();
  popupEditCopy.setEventListeners();
  writeInfoInInput(); // >>
});

editAvaOverlay.addEventListener('click', () => {
  popupAvaCopy.open();
  popupAvaCopy.setEventListeners();
})

/*
popupEditCopy.setEventListeners();
popupAddCopy.setEventListeners();
popupAvaCopy.setEventListeners();
popupPhotoCopy.setEventListeners();
*/

formEdit.addEventListener('submit', function(evt) {
  evt.preventDefault();
  formEditSaveBtn.textContent = 'Сохранение...';
  const { name, about } = evt.currentTarget.elements;
  userInfo.setUserInfo(name.value, about.value)
});

formAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const btn = formAdd.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { title, link } = evt.currentTarget.elements;
  api.postNewCard({
    name: title.value,
    link: link.value
  })
    .then(res => api.checkResult(res))
    .then(data => {
      const card = new Card(data, cardTemplate, popupPhotoCopy.open);
      const cardEl = card.element;
      cardList.addItem(cardEl)
      popupAddCopy.close();
      FormValidator.toggleSubmitBtn(formAdd, btn, obj.inactiveButtonClass);
    })
    .catch(err => console.log(err))
    .finally(() => {
      btn.textContent = 'Создать'
  });
  formAdd.reset();
});

for (const form of document.forms) {
  const validator = new FormValidator(obj, form);
  validator.enableValidation();
}

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cards]) => {
    renderProfile(userData);
    cardList = new Section({
      items: cards, 
      renderer: (item) => {
          const card = new Card(item, cardTemplate, popupPhotoCopy.open);
          const cardEl = card.element;
          cardList.addItem(cardEl)
        }
      }, '.cards');
    cardList.renderItems();
  })
  .catch(err => {
    console.log(err)
});

function renderProfile(data) {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profilePic.src = data.avatar;
}

formAva.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const btn = formAva.querySelector('.form__button-save');
  btn.textContent = 'Сохранение...';
  const { avatar } = evt.currentTarget.elements;
  api.changeAva({avatar: avatar.value})
    .then(res => {
      api.checkResult(res);
      profilePic.src = inputAva.value;
      popupAvaCopy.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      btn.textContent = 'Сохранить'
  });
})
