export default class Api {
  constructor(options) {
    // this._token = options.token;
    this._options = options;
    this._cohortId = options.cohortId;
    this._headers = {authorization: options.token}
    this._urlGetProfile = `https://nomoreparties.co/v1/${this._cohortId}/users/me`
    this._urlGetCards = `https://nomoreparties.co/v1/${this._cohortId}/cards`
    this._urlSetProfile = `https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`
  }

  _requestServer(url, method, dataObject) {
    let options
    if (method === 'GET') {
      options = {
        method: method,
          headers: {authorization: this._options.token}
      }
    } else {
      options = {
        method: method,
        headers: {
          authorization: this._options.token,
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

  addCard() {

  }

  getLikesCount() {

  }

  addLike() {

  }

  removeLike() {

  }

  updateAvatar() {

  }
}