import { Card } from '../scripts/Components/Card.js';
import { FormValidation } from '../scripts/Components/FormValidation.js';
import { PopupWithImage } from '../scripts/Components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/Components/PopupWithForm.js';
import { Section } from '../scripts/Components/Section.js';
import { UserInfo } from '../scripts/Components/UserInfo.js';

import { validationValue, profileEditButton, profileAddButton, popupEditProfileForm, popupEditProfileInputName, 
         popupEditProfileInputInfo, popupAddCardForm} from '../scripts/utils/constants.js';

import './index.css';

const initialCards = [
    { name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },

    { name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },

    { name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },

    { name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },

    { name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },

    { name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
];

const validationProfileForm = new FormValidation(validationValue, popupEditProfileForm);
const validationCardForm = new FormValidation(validationValue, popupAddCardForm);
const popupWithImage = new PopupWithImage('.popup_content_view-image');
const userInfo = new UserInfo( { nameSelector: '.profile__name', infoSelector: '.profile__subname'});
const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', (data) => {
    userInfo.setUserInfo(data.name, data.info);
});

const section = new Section( {
    initialCards, renderer: (item) => {
        console.log(item);
        const newCard = createCard(item);
        section.addItem(newCard);
    },
}, '.elements'
);

const popupAddNewCard = new PopupWithForm('.popup_content_add-card', (item) => {
    const newCard = createCard(item);
    console.log(item);
    section.addItem(newCard);
});

function createCard(data) {
    const card = new Card(data, '#element__card', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

function checkNewOpen(form, validationForm) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__save-button');
    validationForm.toggleButtonState(inputList, buttonElement);
}

function handleCardClick(title, photo) {
    popupWithImage.open(title, photo);
}

profileAddButton.addEventListener('click', () => {
    popupAddCardForm.reset();
    checkNewOpen(popupAddCardForm, validationCardForm);
    validationCardForm.clearErrors(popupAddCardForm);
    popupAddNewCard.open();
});

profileEditButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    popupEditProfileInputName.value = data.name
    popupEditProfileInputInfo.value = data.info;
    checkNewOpen(popupEditProfileForm, validationProfileForm);
    validationProfileForm.clearErrors(popupEditProfileForm);
    popupEditProfileInfo.open();
});


popupWithImage.setEventListeners();
popupEditProfileInfo.setEventListeners();
popupAddNewCard.setEventListeners();
validationProfileForm.enableValidation();
validationCardForm.enableValidation();