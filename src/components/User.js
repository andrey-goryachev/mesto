export default class User {
  constructor({ name, info, avatar, changeAvatar }) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;
    this._avatarContainer = avatar.parentNode;
    this._changeAvatar = changeAvatar;
    this._id = '';
  }

  setEventListeners() {
    this._avatarContainer.addEventListener('click', (e) => {
      this._changeAvatar();
    });
  }

  getInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      id: this._id,
    };
  }

  setInfo({ name, info }) {
    return new Promise((resolve, reject) => {
      const nameLoaded = new Promise((resolve, reject) => {
          this._name.textContent = name;
          this._name.textContent === name ? resolve() : reject()
        });

      const infoLoaded = new Promise((resolve, reject) => {
          this._info.textContent = info;
          this._info.textContent === info ? resolve() : reject()
        });

      Promise.all([nameLoaded, infoLoaded])
        .then(() => {resolve()})
        .catch(() => {reject()});
    });
  }

  setAvatar(link) {
    return new Promise((resolve, reject) => {
      this._avatar.src = link;
      this._avatar.onerror = reject;
      this._avatar.onload = resolve;
    });
  }

  setId(id) {
    this._id = id;
  }
}
