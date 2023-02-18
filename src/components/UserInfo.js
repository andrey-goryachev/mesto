export default class UserInfo {
  constructor({name, info, avatar}) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;
    this._id = '';
  }

  getInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      id: this._id
    }
  }

  setInfo({name, info}) {
    this._name.textContent = name
    this._info.textContent = info
  }

  setAvatar(link) {
    this._avatar.src = link
  }

  setId(id) {
    this._id = id
  }
}