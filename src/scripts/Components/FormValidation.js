export class FormValidation {
    constructor(validationValue, currentForm) {
        this._formSelector = validationValue.formSelector;
        this._inputSelector = validationValue.inputSelector;
        this._submitButtonSelector = validationValue.submitButtonSelector;
        this._inactiveButtonClass = validationValue.inactiveButtonClass;
        this._inputErrorClass = validationValue.inputErrorClass;
        this._errorClass = validationValue.errorClass;
        this._currentForm = currentForm;
        this._inputList = Array.from(this._currentForm.querySelectorAll(this._inputSelector));
        this._buttonElement = this._currentForm.querySelector(this._submitButtonSelector);
    }

    clearErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    enableValidation() {
        this._currentForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    };

    _hideInputError(inputElement) {
        const errorElement = this._currentForm.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _showInputError = (inputElement) => {
        const errorElement = this._currentForm.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };
}