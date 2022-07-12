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

export function newCard (data) {
  const card = new Card(
    data, 
    cardTemplate, 
    popupPhotoCopy.open, 
    function () {
      api.like(card.id, !card.isLiked)
        .then((data) => card.processLikes(data.likes))
        .catch(err => console.log(`Ошибка лайка карточки: ${err}`));
    },
    function () {
      api.deleteCard(card.id)
        .then(() => card.delete())
        .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
    }
  );
  return card.element;
}

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
        cardList.addItem(newCard(item), false)
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
