class FormValidation {
    constructor(formValidation) {
        this._formSelector = formValidation.formSelector;
        this._inputSelector = formValidation.inputSelector;
        this._submitButtonSelector = formValidation.submitButtonSelector;
        this._inactiveButtonClass = formValidation.inactiveButtonClass;
        this._inputErrorClass = formValidation.inputErrorClass;
        this._errorClass = formValidation.errorClass;
    }

    _clearErrors(formElement, validationValue) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, validationValue);
        });
    }

    _enableValidation(validationValue) {
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setEventListeners(formElement, validationValue);
        });
    }

    _checkNewOpen(form) {
        inputList = Array.from(form.querySelectorAll('.popup__input'));
        buttonElement = form.querySelector('.popup__save-button');
        toggleButtonState(inputList, buttonElement, validationValue);
    }

    _setEventListeners(formElement, validationValue) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        toggleButtonState(inputList, buttonElement, validationValue);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement, validationValue);
                toggleButtonState(inputList, buttonElement, validationValue);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement, validationValue) {
        if (hasInvalidInput(inputList)) {
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

    _checkInputValidity(formElement, inputElement, validationValue) {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage, validationValue);
        }
        else {
            hideInputError(formElement, inputElement, validationValue);
        }
    };

    _hideInputError(formElement, inputElement, validationValue) {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _showInputError = (formElement, inputElement, errorMessage, validationValue) => {
        const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
}

export default FormValidation;