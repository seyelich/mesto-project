const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '852ffeba-5671-4f68-8ab6-8c0acff8e405',
    'Content-Type': 'application/json'
  }
}

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

export function changeProfile(newProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfile.name,
      about: newProfile.about
    })
  })
}

export function postNewCard(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function changeAva(newAvaUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvaUrl.avatar
    })
  })
}
