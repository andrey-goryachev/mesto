export default class Api {
  constructor(options) {
    this._token = options.token;
    this._cohortId = options.cohortId;
  }

  getProfile() {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
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

  getInitialCards() {
    // ...
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