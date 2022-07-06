import { api } from "./Api";
import { popupEdit, formEditSaveBtn } from "./constants";
import { closePopup } from "./utils";

class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userInfo = api.getProfileInfo().then(res => {return res});
    return userInfo;
  }

  setUserInfo(userNameVal, userAboutVal) {
    api.changeProfile({
      name: userNameVal,
      about: userAboutVal
    })
      .then(res => {
        api.checkResult(res);
        this._userName.textContent = userNameVal;
        this._userAbout.textContent = userAboutVal;
        closePopup(popupEdit);
      })
      .catch(err => console.log(err))
      .finally(() => {
        formEditSaveBtn.textContent = 'Сохранить'
    });
  }
}

export const userInfo = new UserInfo('.profile__name', '.profile__description');