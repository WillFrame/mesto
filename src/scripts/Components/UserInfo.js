export class UserInfo {
    constructor( { nameSelector, infoSelector}) {
        this._currentName = document.querySelector(nameSelector);
        this._currentInfo = document.querySelector(infoSelector);
    }

    getUserInfo() {
        return { name: this._currentName.textContent, info: this._currentInfo.textContent};
    }

    setUserInfo(newName, newInfo) {
        this._currentName.textContent = newName;
        this._currentInfo.textContent = newInfo;
    }
}