import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._inputs = this._popup.querySelectorAll('.popup__input');
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
        this._popup.addEventListener('submit', (event) => {
            evt.preventDefault();
            submitCallback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._inputs.forEach(item => {
            item.value = '';
        });
    }
}