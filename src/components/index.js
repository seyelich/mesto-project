import '../pages/index.css';
import { editButton, addButton, obj, editAvaOverlay, cardTemplate, inputAbout, inputName, formAdd, formEdit, formAva } from './constants';
import { formEditSubmitHandler, formAddSubmitHandler, formAvaSubmitHandler } from './modal';
import { Card } from './Card';
import { FormValidator } from './FormValidator';
import { api } from './Api';
import { PopupWithForm } from './PopupWithForm';
import { PopupWithImage } from './PopupWithImage';
import Section from './Section';
import { userInfo } from './UserInfo';

export let cardList;
export let myId;

export const popupEditCopy = new PopupWithForm('.popup-edit', formEditSubmitHandler);
export const popupAddCopy = new PopupWithForm('.popup-add', formAddSubmitHandler);
export const popupAvaCopy = new PopupWithForm('.popup-avatar', formAvaSubmitHandler);
export const popupPhotoCopy = new PopupWithImage('.popup-photo');
const editFormValidator = new FormValidator(obj, formEdit);
const addFormValidator = new FormValidator(obj, formAdd);
const avaFormValidator = new FormValidator(obj, formAva);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
avaFormValidator.enableValidation();

export function newCard (data) {
  const card = new Card(
    data, 
    cardTemplate, 
    popupPhotoCopy.open, 
    function () {
      api.likeCard(card.id, !card.isLiked)
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
  inputName.value = userInfo.getUserInfo().name;
  inputAbout.value = userInfo.getUserInfo().about;
});

editAvaOverlay.addEventListener('click', () => {
  popupAvaCopy.open();
})

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
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

