class Api {
  constructor( { baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkResult(res) {
    if(res.ok) { 
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this.checkResult(res))
  }
  
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this.checkResult(res))
  }
  
  changeProfile(newProfile) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newProfile.name,
        about: newProfile.about
      })
    }).then(res => this.checkResult(res))
  }
  
  postNewCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
      })
    }).then(res => this.checkResult(res))
  }
  
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this.checkResult(res))
  }
  
  like(cardId, like) {
    const method = like ? 'PUT' : 'DELETE';
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers
    }).then(res => this.checkResult(res))
  }

  changeAva(newAvaUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvaUrl.avatar
      })
    }).then(res => this.checkResult(res))
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '852ffeba-5671-4f68-8ab6-8c0acff8e405',
    'Content-Type': 'application/json'
  }
})
