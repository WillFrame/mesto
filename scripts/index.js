let profileEditButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let profileEditCloseButton = document.querySelector('.popup__close');

let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileSubName = document.querySelector('.profile__subname');
let inputName = document.querySelector('.popup__input_content_name');
let inputSubName = document.querySelector('.popup__input_content_subname');

function popupOpen() {
    inputName.value = profileName.textContent;
    inputSubName.value = profileSubName.textContent;
    popup.classList.add('popup_opened');
}

function popupSubmit(event) {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileSubName.textContent = inputSubName.value;
    popupClose();
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
formElement.addEventListener('submit', popupSubmit);
profileEditCloseButton.addEventListener('click', popupClose);