export class UserInfo {
    constructor( { nameSelector, infoSelector, avatarSelector}) {
        this._currentName = document.querySelector(nameSelector);
        this._currentInfo = document.querySelector(infoSelector);
        this._currentAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { name: this._currentName.textContent, info: this._currentInfo.textContent};
    }

    setUserInfo(newName, newInfo) {
        this._currentName.textContent = newName;
        this._currentInfo.textContent = newInfo;
    }

    setNewAvatar(newAvatar) {
        this._currentAvatar.src = newAvatar;
    }
}