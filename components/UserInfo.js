export default class UserInfo {
  constructor({selectorName, selectorInfo}) {
    this._selectorName = selectorName;
    this._selectorInfo = selectorInfo;
    this._name = this._selectorName.textContent
    this._info = this._selectorInfo.textContent
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info
    }
  }

  setUserInfo({name, info}) {
    this._name = name
    this._selectorName.textContent = name
    this._info = info
    this._selectorInfo.textContent = info
  }
}