const validationValue = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function clearErrors(formElement, validationValue) {
    const inputList = Array.from(formElement.querySelectorAll(validationValue.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationValue);
    });
}

const enableValidation = (validationValue) => {
    const formList = Array.from(document.querySelectorAll(validationValue.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationValue);
    });
};

const setEventListeners = (formElement, validationValue) => {
    const inputList = Array.from(formElement.querySelectorAll(validationValue.inputSelector));
    const buttonElement = formElement.querySelector(validationValue.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationValue);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationValue);
            toggleButtonState(inputList, buttonElement, validationValue);
        });
    });
};

function toggleButtonState(inputList, buttonElement, validationValue) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationValue.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(validationValue.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const checkInputValidity = (formElement, inputElement, validationValue) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationValue);
    }
    else {
        hideInputError(formElement, inputElement, validationValue);
    }
};

const hideInputError = (formElement, inputElement, validationValue) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(validationValue.inputErrorClass);
    errorElement.classList.remove(validationValue.errorClass);
    errorElement.textContent = '';
};

const showInputError = (formElement, inputElement, errorMessage, validationValue) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(validationValue.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationValue.errorClass);
};

enableValidation(validationValue);