import { Popup } from "./Popup";

export class ConfirmationPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitCallback = () => {};
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._submitText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.formIsLoading(true);
            this._submitCallback();
        });
    }

    formIsLoading(check) {
        if (check) {
            this._submitButton.textContent = 'Удаление...';
        } else {
            this._submitButton.textContent = this._submitText;
        }
    }

    changeSubmitCallback(newSubmitCallback) {
        this._submitCallback = newSubmitCallback
    }
}