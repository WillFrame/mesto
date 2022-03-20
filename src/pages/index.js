import { Card } from '../scripts/Components/Card.js';
import { FormValidation } from '../scripts/Components/FormValidation.js';
import { PopupWithImage } from '../scripts/Components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/Components/PopupWithForm.js';
import { Section } from '../scripts/Components/Section.js';
import { UserInfo } from '../scripts/Components/UserInfo.js';

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

const validationValue = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const elementsContainer = document.querySelector('.elements');

const popupViewImage = document.querySelector('.popup_content_view-image')
const popupPhoto = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__view-image-title');

const profileName = document.querySelector('.profile__name');
const profileSubName = document.querySelector('.profile__subname');

const popups = Array.from(document.querySelectorAll('.popup'));

const popupEditProfile = document.querySelector('.popup_content_edit-profile');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_content_name');
const popupEditProfileInputSubName = popupEditProfile.querySelector('.popup__input_content_subname');

const popupAddCard = document.querySelector('.popup_content_add-card');
const popupAddCardForm = popupAddCard.querySelector('.popup__form');
const popupAddCardInputTitle = popupAddCard.querySelector('.popup__input_content_title');
const popupAddCardInputImage = popupAddCard.querySelector('.popup__input_content_image');

const validationProfileForm = new FormValidation(validationValue, popupEditProfileForm);
const validationCardForm = new FormValidation(validationValue, popupAddCardForm);
const popupWithImage = new PopupWithImage('.popup_content_view-image');

function createCard(data) {
    const card = new Card(data, '#element__card');
    const cardElement = card.generateCard();
    return cardElement;
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function submitPopup(popup, event) {
    event.preventDefault();
    closePopup(popup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

function checkNewOpen(form, validationForm) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const buttonElement = form.querySelector('.popup__save-button');
    validationForm.toggleButtonState(inputList, buttonElement);
}

function closeByEscape(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
        closePopup(currentPopup);
    }
};

export function handleCardClick(title, photo) {
    popupWithImage.open(title, photo);
}

initialCards.forEach((item) => {
    const card = createCard(item);
    elementsContainer.prepend(card);
});

popups.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
            closePopup(item);
        }
    });
});

profileAddButton.addEventListener('click', () => {
    popupAddCardForm.reset();
    checkNewOpen(popupAddCardForm, validationCardForm);
    validationCardForm.clearErrors(popupAddCardForm);
    openPopup(popupAddCard);
});

popupAddCardForm.addEventListener('submit', (event) => {
    submitPopup(popupAddCard, event);
    const card = createCard( { name: popupAddCardInputTitle.value, link: popupAddCardInputImage.value });
    elementsContainer.prepend(card);
});

profileEditButton.addEventListener('click', () => {
    popupEditProfileInputName.value = profileName.textContent;
    popupEditProfileInputSubName.value = profileSubName.textContent;
    checkNewOpen(popupEditProfileForm, validationProfileForm);
    validationProfileForm.clearErrors(popupEditProfileForm);
    openPopup(popupEditProfile);
});

popupEditProfileForm.addEventListener('submit', (event) => {
    submitPopup(popupEditProfile, event);
    profileName.textContent = popupEditProfileInputName.value;
    profileSubName.textContent = popupEditProfileInputSubName.value;
});

validationProfileForm.enableValidation();
validationCardForm.enableValidation();