import { api } from "./Api";
import { popupEdit, formEditSaveBtn } from "./constants";
import { closePopup } from "./utils";

class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this.userNameSelector = userNameSelector;
    this.userAboutSelector = userAboutSelector;
  }

  getUserInfo() {
    const userInfo = api.getProfileInfo().then(res => {return res});
    return userInfo;
  }

  setUserInfo(userName, userAbout) {
    api.changeProfile({
      name: userName,
      about: userAbout
    })
      .then(res => {
        api.checkResult(res);
        document.querySelector(this.userNameSelector).textContent = userName;
        document.querySelector(this.userAboutSelector).textContent = userAbout;
        closePopup(popupEdit);
      })
      .catch(err => console.log(err))
      .finally(() => {
        formEditSaveBtn.textContent = 'Сохранить'
    });
  }
}

export const userInfo = new UserInfo('.profile__name', '.profile__description');
