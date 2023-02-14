export default class Api {
  constructor(options) {
    // this._token = options.token;
    this._cohortId = options.cohortId;
    this._headers = {authorization: options.token}
    this._urlGetProfile = `https://nomoreparties.co/v1/${this._cohortId}/users/me`
    this._urlGetCards = `https://nomoreparties.co/v1/${this._cohortId}/cards`
  }

  _requestServer(url) {
    return fetch(url, {
      headers: this._headers
    })
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
    return this._requestServer(this._urlGetProfile)
  }

  getInitialCards() {
    return this._requestServer(this._urlGetCards)
  }

  setProfile() {

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