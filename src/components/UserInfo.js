import { profileAbout, profileName } from "./constants";

class UserInfo {
  constructor(userNameSelector, userAboutSelector,userAvaSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAva = document.querySelector(userAvaSelector)
  }

  getUserInfo() {
    const userInfo = {
      name: profileName.textContent,
      about: profileAbout.textContent
    }
    return userInfo;
  }

  setUserInfo(userNameVal, userAboutVal) {
    this._userName.textContent = userNameVal;
    this._userAbout.textContent = userAboutVal;
  }

  setUserAvatar(userAvaUrl) {
    this._userAva.src = userAvaUrl;
  }
}

export const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__img');
