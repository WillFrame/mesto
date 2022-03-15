class FormValidation {
    constructor(formValidation) {
        this._formSelector = formValidation.formSelector;
        this._inputSelector = formValidation.inputSelector;
        this._submitButtonSelector = formValidation.submitButtonSelector;
        this._inactiveButtonClass = formValidation.inactiveButtonClass;
        this._inputErrorClass = formValidation.inputErrorClass;
        this._errorClass = formValidation.errorClass;
    }

    _clearErrors(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement);
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((item) => {
            item.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(item);
        });
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
        else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement);
        }
        else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _showInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };
}

export default FormValidation;