class FormValidation {
    constructor(validationValue, currentForm) {
        this._formSelector = validationValue.formSelector;
        this._inputSelector = validationValue.inputSelector;
        this._submitButtonSelector = validationValue.submitButtonSelector;
        this._inactiveButtonClass = validationValue.inactiveButtonClass;
        this._inputErrorClass = validationValue.inputErrorClass;
        this._errorClass = validationValue.errorClass;
        this._currentForm = currentForm;
    }

    clearErrors(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(formElement, inputElement);
        });
    }

    enableValidation() {
        this._currentForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._currentForm);
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this.toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    toggleButtonState(inputList, buttonElement) {
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