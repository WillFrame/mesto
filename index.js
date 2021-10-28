let profileEditButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__save-button');
let profileEditCloseButton = document.querySelector('.popup__close');

function popupOpen() {
    let popup = document.querySelector('.popup');
    let profileName = document.querySelector('.profile__name');
    let profileSubName = document.querySelector('.profile__subname');
    let inputName = document.querySelector('.popup__input_name');
    let inputSubName = document.querySelector('.popup__input_subname');
    /* я знаю, что в задании указаны другие имена, но я уже везде использовал эти */

    popup.classList.toggle('popup_opened');
    inputName.value = profileName.textContent;
    inputSubName.value = profileSubName.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    console.log("its work!");
    let popup = document.querySelector('.popup');
    let profileName = document.querySelector('.profile__name');
    let profileSubName = document.querySelector('.profile__subname');
    let inputName = document.querySelector('.popup__input_name');
    let inputSubName = document.querySelector('.popup__input_subname');

    profileName.textContent = inputName.value;
    profileSubName.textContent = inputSubName.value;
    console.log("its work!");
    popup.classList.toggle('popup_opened');
}

function popupClose() {
    let popup = document.querySelector('.popup');
    
    popup.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
formElement.addEventListener('submit', formSubmitHandler);
profileEditCloseButton.addEventListener('click', popupClose);