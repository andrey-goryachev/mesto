export default class Api {
  constructor(options) {
    // this._options = options;
    this._token = options.token
    this._headers = {authorization: options.token}
    this._urlBase = options.urlBase

    this._urlGetProfile = `${this._urlBase}/users/me`
    this._urlGetCards = `${this._urlBase}/cards`
    this._urlSetProfile = `${this._urlBase}/users/me`
    this._urlAddCard = `${this._urlBase}/cards`
    
  }

  _requestServer(url, method, dataObject) {
    let options
    if (method === 'GET') {
      options = {
        method: method,
          headers: {authorization: this._token}
      }
    } else {
      options = {
        method: method,
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObject)
      }
    }

    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка статус ${res.status}`)
        }
      })
      .then((res) => {
        return res
      })
      .catch(err => console.log(err))
  }

  getProfile() {
    return this._requestServer(this._urlGetProfile, 'GET')
  }

  getInitialCards() {
    return this._requestServer(this._urlGetCards, 'GET')
  }

  setProfile(userObject) {
    return this._requestServer(this._urlSetProfile, 'PATCH', userObject)
  }

  addCard(cardObject) {
    return this._requestServer(this._urlAddCard, 'POST', cardObject)
  }

  deleteCard(deleteElement) {
    this._urlDeleteCard = `${this._urlBase}/cards/${deleteElement.id}`
    return this._requestServer(this._urlDeleteCard, 'DELETE')
  }

  // getLikesCount() {

  // }

  addLike(cardId) {
    this._urlLike = `${this._urlBase}/cards/${cardId}/likes`
    return this._requestServer(this._urlLike, 'PUT')
  }

  removeLike(cardId) {
    this._urlLike = `${this._urlBase}/cards/${cardId}/likes`
    return this._requestServer(this._urlLike, 'DELETE')
  }

  updateAvatar() {

  }
}