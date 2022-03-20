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
    { 
      title: 'Архыз',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
    },

    { 
      title: 'Челябинская область',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },

    { 
      title: 'Иваново',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
    },

    {
      title: 'Камчатка',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
    },

    { 
      title: 'Холмогорский район',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },

    { 
      title: 'Байкал',
      photo: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
    }
];

const validationProfileForm = new FormValidation(validationValue, popupEditProfileForm);
const validationCardForm = new FormValidation(validationValue, popupAddCardForm);
const popupWithImage = new PopupWithImage('.popup_content_view-image');
const userInfo = new UserInfo( { nameSelector: '.profile__name', infoSelector: '.profile__subname'});
const popupEditProfileInfo = new PopupWithForm('.popup_content_edit-profile', (data) => {
    userInfo.setUserInfo(data.name, data.info);
});

const section = new Section( {
    items: initialCards, 
    renderer: (item) => {
        const newCard = createCard(item);
        section.addItem(newCard);
    },
}, '.elements'
);

const popupAddNewCard = new PopupWithForm('.popup_content_add-card', (item) => {
    const newCard = createCard(item);
    section.addItem(newCard);
});

function createCard(data) {
    const card = new Card(data, '#element__card', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

function handleCardClick(title, photo) {
    popupWithImage.open(title, photo);
}

profileAddButton.addEventListener('click', () => {
    popupAddCardForm.reset();
    validationCardForm.toggleButtonState();
    validationCardForm.clearErrors();
    popupAddNewCard.open();
});

profileEditButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    popupEditProfileInputName.value = data.name
    popupEditProfileInputInfo.value = data.info;
    validationProfileForm.toggleButtonState();
    validationProfileForm.clearErrors();
    popupEditProfileInfo.open();
});

section.setItem();
popupWithImage.setEventListeners();
popupEditProfileInfo.setEventListeners();
popupAddNewCard.setEventListeners();
validationProfileForm.enableValidation();
validationCardForm.enableValidation();