import { formEditSaveBtn, inputAva } from './constants';
import { userInfo } from './UserInfo';
import { api } from './Api';
import { popupAddCopy, popupAvaCopy, popupEditCopy } from './PopupWithForm';
import { cardList, newCard } from '.';

export function formEditSubmitHandler(evt) {
  evt.preventDefault();
  formEditSaveBtn.textContent = 'Сохранение...';
  const { name, about } = evt.currentTarget.elements;
  api.changeProfile({
    name: name.value,
    about: about.value
  })
    .then(() => {
      userInfo.setUserInfo(name.value, about.value)
      popupEditCopy.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      formEditSaveBtn.textContent = 'Сохранить'
  });
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
    .then(data => {
      cardList.addItem(newCard(data), true);
      popupAddCopy.close();
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
    .then(() => {
      userInfo.setUserAvatar(inputAva.value)
      popupAvaCopy.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      btn.textContent = 'Сохранить'
  });
}