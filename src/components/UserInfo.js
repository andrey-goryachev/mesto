export default class UserInfo {
  constructor({ name, about, avatar, changeAvatar }) {
    this._name = name;
    this._about = about;
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
      about: this._about.textContent,
      id: this._id,
    };
  }

  setInfo({ name, about }) {
    return new Promise((resolve, reject) => {
      const nameLoaded = new Promise((resolve, reject) => {
          this._name.textContent = name;
          this._name.textContent === name ? resolve() : reject()
        });

      const aboutLoaded = new Promise((resolve, reject) => {
          this._about.textContent = about;
          this._about.textContent === about ? resolve() : reject()
        });

      Promise.all([nameLoaded, aboutLoaded])
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
