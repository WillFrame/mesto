import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._submitText = this._submitButton.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach(item => {
            this._inputValues[item.name] = item.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.formIsLoading(true);
            this._submitCallback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._inputs.forEach(item => {
            item.value = '';
        });
    }

    formIsLoading(check) {
        if (check) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._submitText;
        }
    }
}