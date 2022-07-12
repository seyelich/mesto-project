import '../pages/index.css';
import { editButton, addButton, obj, editAvaOverlay, cardTemplate, inputAbout, inputName } from './constants';
import { Card } from './Card';
import { FormValidator } from './FormValidator';
import { api } from './Api';
import { popupEditCopy, popupAddCopy, popupAvaCopy } from './PopupWithForm';
import { popupPhotoCopy } from './PopupWithImage';
import Section from './Section';
import { userInfo } from './UserInfo';

export let cardList;
export let myId;

addButton.addEventListener('click', () => {
  popupAddCopy.open();
});

editButton.addEventListener('click', () => {
  popupEditCopy.open();
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
});

editAvaOverlay.addEventListener('click', () => {
  popupAvaCopy.open();
})

for (const form of document.forms) {
  const validator = new FormValidator(obj, form);
  validator.enableValidation();
}

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    myId = userData._id;
    cardList = new Section({
      items: cards, 
      renderer: (item) => {
          const card = new Card(item, cardTemplate, popupPhotoCopy.open);
          const cardEl = card.element;
          cardList.addItem(cardEl, false)
        }
      }, '.cards');
    cardList.renderItems();
  })
  .catch(err => {
    console.log(err)
});

