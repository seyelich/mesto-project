import '../pages/index.css';
import { editButton, addButton, obj, editAvaOverlay, profilePic, profileName, profileAbout, cardTemplate } from './constants';
import { writeInfoInInput } from './modal';
import { Card } from './Card';
import { FormValidator } from './FormValidator';
import { api } from './Api';
import { popupEditCopy, popupAddCopy, popupAvaCopy } from './PopupWithForm';
import { popupPhotoCopy } from './PopupWithImage';
import Section from './Section';

export let cardList;
export let myId;

addButton.addEventListener('click', () => {
  popupAddCopy.open();
});

editButton.addEventListener('click', () => {
  popupEditCopy.open();
  writeInfoInInput();
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
    renderProfile(userData);
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

//Можно ли заменить на какой-либо метод класса?
function renderProfile(data) {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  profilePic.src = data.avatar;
}
