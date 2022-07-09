import { profileName, profileAbout, inputAbout, inputName, formEditSaveBtn, cardTemplate, obj, profilePic, inputAva } from './constants';
import { userInfo } from './UserInfo';
import { api } from './Api';
import { FormValidator } from './FormValidator';
import { popupAddCopy, popupAvaCopy } from './PopupWithForm';
import { Card } from './Card';
import { popupPhotoCopy } from './PopupWithImage';
import { cardList } from '.';

export function writeInfoInInput() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

export function formEditSubmitHandler(evt) {
  evt.preventDefault();
  formEditSaveBtn.textContent = 'Сохранение...';
  const { name, about } = evt.currentTarget.elements;
  userInfo.setUserInfo(name.value, about.value)
}

export function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const btn = evt.currentTarget.querySelector('.form__button-save');
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
      cardList.addItem(cardEl, true)
      popupAddCopy.close();
      FormValidator.toggleSubmitBtn(evt.currentTarget, btn, obj.inactiveButtonClass);
    })
    .catch(err => console.log(err))
    .finally(() => {
      btn.textContent = 'Создать'
  });
  evt.currentTarget.reset();
}

export function formAvaSubmitHandler(evt) {
  evt.preventDefault();
  const btn = evt.currentTarget.querySelector('.form__button-save');
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
}