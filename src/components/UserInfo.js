export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._avatarContainer = avatar.parentNode;
    this._id = '';
  }

  getInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      id: this._id,
    };
  }

  setInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this.setAvatar(avatar)
    this._id = _id;
  }

  setAvatar(link) {
      this._avatar.src = link;
  }
}
