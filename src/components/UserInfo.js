export default class UserInfo {
  constructor({selectorName, selectorInfo}) {
    this._selectorName = selectorName;
    this._selectorInfo = selectorInfo;
  }

  getUserInfo() {
    return {
      name: this._selectorName.textContent,
      info: this._selectorInfo.textContent
    }
  }

  setUserInfo({name, info}) {
    this._selectorName.textContent = name
    this._selectorInfo.textContent = info
  }
}